use crate::rpcs::prelude::*;
use lib_core::model::{
	department::{DepartmentBmc, DepartmentFilter},
	doctor::{
		Doctor, DoctorBmc, DoctorFilter, DoctorForCreate,
		QueryedDoctor, QueryedDoctorForCreate,
	},
};
use serde_json::json;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_doctor,
		get_doctor,
		list_doctors,
		// update_doctor,
		delete_doctor,
	)
}

pub async fn dequery_doctor(
	data: QueryedDoctorForCreate,
	ctx: &Ctx,
	mm: &ModelManager,
) -> Result<DoctorForCreate> {
	let QueryedDoctorForCreate {
		department: ref department_name,
		..
	} = data;
	let department_filter: DepartmentFilter = serde_json::from_value(json!(
		{
			"name": {"$eq": department_name},
		}
	))?;
	let department_id =
		DepartmentBmc::first(ctx, mm, Some(vec![department_filter]), None)
			.await?
			.expect("No department id found (there should be one)")
			.id;

	Ok(data.to_doctor4create(department_id))
}

pub async fn query_doctor(
	data: Doctor,
	ctx: &Ctx,
	mm: &ModelManager,
) -> Result<QueryedDoctor> {
	let department_name =
		DepartmentBmc::get(ctx, mm, data.department_id).await?.name;

	Ok(data.to_queryed_doctor(department_name))
}

pub async fn create_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsForCreate<QueryedDoctorForCreate>,
) -> Result<DataRpcResult<QueryedDoctor>> {
	let ParamsForCreate { data } = params;

	let data = dequery_doctor(data, &ctx, &mm).await?;

	let id = DoctorBmc::create(&ctx, &mm, data).await?;
	let entity = DoctorBmc::get(&ctx, &mm, id).await?;

	let entity = query_doctor(entity, &ctx, &mm).await?;

	Ok(entity.into())
}

pub async fn get_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsIded,
) -> Result<DataRpcResult<QueryedDoctor>> {
	let entity = DoctorBmc::get(&ctx, &mm, params.id).await?;

	let entity = query_doctor(entity, &ctx, &mm).await?;
	Ok(entity.into())
}

pub async fn list_doctors(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsList<DoctorFilter>,
) -> Result<DataRpcResult<Vec<Doctor>>> {
	let entities =
		DoctorBmc::list(&ctx, &mm, params.filters, params.list_options).await?;
	Ok(entities.into())
}

pub async fn delete_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsIded,
) -> Result<DataRpcResult<QueryedDoctor>> {
	let ParamsIded { id } = params;
	let entity = DoctorBmc::get(&ctx, &mm, id).await?;
	DoctorBmc::delete(&ctx, &mm, id).await?;
	let entity = query_doctor(entity, &ctx, &mm).await?;
	Ok(entity.into())
}
