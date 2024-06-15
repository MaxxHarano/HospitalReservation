use crate::rpcs::prelude::*;
use futures::future::join_all;
use lib_core::model::{
	department::{DepartmentBmc, DepartmentFilter},
	doctor::{
		Doctor, DoctorBmc, DoctorFilter, QueryedDoctor, QueryedDoctorForCreate,
		QueryedDoctorForUpdate,
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

pub async fn department_entity2id(
	department_name: &String,
	ctx: &Ctx,
	mm: &ModelManager,
) -> Result<i64> {
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
	Ok(department_id)
}

/// *Deprecated*
// pub async fn dequery_doctor(
// 	data: QueryedDoctorForCreate,
// 	ctx: &Ctx,
// 	mm: &ModelManager,
// ) -> Result<DoctorForCreate> {
// 	let QueryedDoctorForCreate {
// 		department: ref department_name,
// 		..
// 	} = data;
// 	let department_filter: DepartmentFilter = serde_json::from_value(json!(
// 		{
// 			"name": {"$eq": department_name},
// 		}
// 	))?;
// 	let department_id =
// 		DepartmentBmc::first(ctx, mm, Some(vec![department_filter]), None)
// 			.await?
// 			.expect("No department id found (there should be one)")
// 			.id;

// 	Ok(data.to_doctor4create(department_id))
// }

pub async fn department_id2entity(
	department_id: i64,
	ctx: &Ctx,
	mm: &ModelManager,
) -> Result<String> {
	Ok(DepartmentBmc::get(ctx, mm, department_id).await?.name)
}

/// *Deprecated*
// pub async fn query_doctor(
// 	data: Doctor,
// 	ctx: &Ctx,
// 	mm: &ModelManager,
// ) -> Result<QueryedDoctor> {
// 	let department_name =
// 		DepartmentBmc::get(ctx, mm, data.department_id).await?.name;

// 	Ok(data.to_queryed_doctor(department_name))
// }

pub async fn create_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsForCreate<QueryedDoctorForCreate>,
) -> Result<DataRpcResult<QueryedDoctor>> {
	let ParamsForCreate { data } = params;

	let department_id = department_entity2id(&data.department, &ctx, &mm).await?;
	let data = data.to_doctor4create(department_id);

	let id = DoctorBmc::create(&ctx, &mm, data).await?;
	let entity = DoctorBmc::get(&ctx, &mm, id)
		.await?
		.to_queryed_doctor(department_id2entity(department_id, &ctx, &mm).await?);

	Ok(entity.into())
}

pub async fn get_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsIded,
) -> Result<DataRpcResult<QueryedDoctor>> {
	let entity = DoctorBmc::get(&ctx, &mm, params.id).await?;

	let entity = entity.to_queryed_doctor(
		department_id2entity(entity.department_id, &ctx, &mm).await?,
	);
	Ok(entity.into())
}

pub async fn list_doctors(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsList<DoctorFilter>,
) -> Result<DataRpcResult<Vec<QueryedDoctor>>> {
	let entities =
		DoctorBmc::list(&ctx, &mm, params.filters, params.list_options).await?;

	let queried_doctors = join_all(entities.into_iter().map(|doctor| {
		let fuck_ctx = ctx.clone();
		let fuck_mm = mm.clone();
		async move {
			doctor.to_queryed_doctor(
				department_id2entity(doctor.department_id, &fuck_ctx, &fuck_mm)
					.await // .await // can't use '?' here | use '.expect()' as a work-around
					.expect("One of the doctor's entity not found"),
			)
		}
	}))
	.await;

	Ok(queried_doctors.into())
}

pub async fn update_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsForUpdate<QueryedDoctorForUpdate>,
) -> Result<DataRpcResult<Doctor>> {
	let ParamsForUpdate { id, data } = params;

	if let Some(ref department_name) = data.department {
		let department_id = department_entity2id(department_name, &ctx, &mm).await?;
		let data = data.to_doctor4update(Some(department_id));
		DoctorBmc::update(&ctx, &mm, id, data).await?;
	} else {
		let data = data.to_doctor4update(None);
		DoctorBmc::update(&ctx, &mm, id, data).await?;
	}

	let entity = DoctorBmc::get(&ctx, &mm, id).await?;
	Ok(entity.into())
}

pub async fn delete_doctor(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsIded,
) -> Result<DataRpcResult<QueryedDoctor>> {
	let ParamsIded { id } = params;
	let entity = DoctorBmc::get(&ctx, &mm, id).await?;
	DoctorBmc::delete(&ctx, &mm, id).await?;
	let entity = entity.to_queryed_doctor(
		department_id2entity(entity.department_id, &ctx, &mm).await?,
	);
	Ok(entity.into())
}
