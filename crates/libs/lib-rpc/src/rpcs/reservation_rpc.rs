use crate::rpcs::prelude::*;
use lib_core::model::{
	department::{DepartmentBmc, DepartmentFilter},
	doctor::{DoctorBmc, DoctorFilter},
	reservation::{
		QueryedReservation, QueryedReservationForCreate, Reservation,
		ReservationBmc, ReservationFilter, ReservationForCreate,
	},
};
use serde_json::json;

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		create_reservation,
		get_reservation,
		list_reservations,
		delete_reservation,
	)
}

pub async fn dequery_reservation(
	data: QueryedReservationForCreate,
	ctx: &Ctx,
	mm: &ModelManager,
) -> Result<ReservationForCreate> {
	// doctor     -> doctor_id
	// department -> department_id
	// first | As long as 'doctor'/'department' can map to a unique id,
	// the correctness of using 'first' is upheld.
	let QueryedReservationForCreate {
		department: ref department_name,
		doctor: ref doctor_name,
		..
	} = data;
	let doctor_filter: DoctorFilter = serde_json::from_value(json!(
		{
			"name": {"$eq": doctor_name},
		}
	))?;
	let doctor_id = DoctorBmc::first(ctx, mm, Some(vec![doctor_filter]), None)
		.await?
		.expect("No doctor id found (there should be one)")
		.id;

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

	Ok(data.to_reservation4create(department_id, doctor_id))
}

pub async fn query_reservation(
	data: Reservation,
	ctx: &Ctx,
	mm: &ModelManager,
) -> Result<QueryedReservation> {
	// doctor_id     -> doctor
	// department_id -> department
	// get
	let doctor_name = DoctorBmc::get(ctx, mm, data.doctor_id).await?.name;
	let department_name =
		DepartmentBmc::get(ctx, mm, data.department_id).await?.name;

	Ok(data.to_queryed_reservation(department_name, doctor_name))
}

pub async fn create_reservation(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsForCreate<QueryedReservationForCreate>,
) -> Result<DataRpcResult<QueryedReservation>> {
	let ParamsForCreate { data } = params;

	// -- Entity to ID
	let data = dequery_reservation(data, &ctx, &mm).await?;

	let id = ReservationBmc::create(&ctx, &mm, data).await?;
	let entity = ReservationBmc::get(&ctx, &mm, id).await?;

	// -- ID to Entity
	let entity = query_reservation(entity, &ctx, &mm).await?;

	Ok(entity.into())
}

pub async fn get_reservation(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsIded,
) -> Result<DataRpcResult<QueryedReservation>> {
	let entity = ReservationBmc::get(&ctx, &mm, params.id).await?;

	let entity = query_reservation(entity, &ctx, &mm).await?;
	Ok(entity.into())
}

pub async fn list_reservations(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsList<ReservationFilter>,
) -> Result<DataRpcResult<Vec<Reservation>>> {
	let entities =
		ReservationBmc::list(&ctx, &mm, params.filters, params.list_options).await?;
	Ok(entities.into())
}

pub async fn delete_reservation(
	ctx: Ctx,
	mm: ModelManager,
	params: ParamsIded,
) -> Result<DataRpcResult<QueryedReservation>> {
	let ParamsIded { id } = params;
	let entity = ReservationBmc::get(&ctx, &mm, id).await?;
	ReservationBmc::delete(&ctx, &mm, id).await?;
	let entity = query_reservation(entity, &ctx, &mm).await?;
	Ok(entity.into())
}
