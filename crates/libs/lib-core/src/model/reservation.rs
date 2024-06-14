use crate::ctx::Ctx;
use crate::generate_common_bmc_fns;
use modql::{field::Fields, filter::{ListOptions, FilterNodes, OpValsInt64, OpValsString, OpValsValue}};
use serde_with::serde_as;
use sqlx::FromRow;
use serde::{Deserialize, Serialize};
use time::OffsetDateTime;
use std::option::Option;
use crate::model::modql_utils::time_to_sea_value;
use crate::model::base::{self, DbBmc};
use crate::model::ModelManager;
use crate::model::Result;
use lib_utils::time::Rfc2822;

// region:    --- Reservation Types

#[serde_as]
#[derive(Debug, Clone, Fields, FromRow, Serialize)]
pub struct QueryedReservation {
    pub id: i64,

	// -- Relations
    pub department: String,
    pub doctor: String,

	// -- Properties
    pub user_name: String,

	#[serde_as(as = "Rfc2822")]
    pub time_range: OffsetDateTime,
}

#[serde_as]
#[derive(Debug, Clone, Fields, FromRow, Serialize)]
pub struct Reservation {
    pub id: i64,

	// -- Relations
    pub department_id: i64,
    pub doctor_id: i64,

	// -- Properties
    pub user_name: String,

	#[serde_as(as = "Rfc2822")]
    pub time_range: OffsetDateTime,
}

impl Reservation {
    pub fn to_queryed_reservation(&self, department: String, doctor: String) -> QueryedReservation {
        QueryedReservation {
            id: self.id,
            department,
            doctor,
            user_name: self.user_name.clone(),
            time_range: self.time_range,
        }
    }
}

#[serde_as]
#[derive(Debug, Clone, Deserialize, Fields)]
pub struct QueryedReservationForCreate {
    pub department: String,
    pub doctor: String,

    pub user_name: String,
	#[serde_as(as = "Rfc2822")]
    pub time_range: OffsetDateTime,
}

impl QueryedReservationForCreate {
    pub fn to_reservation4create(&self, department_id: i64, doctor_id: i64) -> ReservationForCreate {
        ReservationForCreate {
            department_id,
            doctor_id,
            user_name: self.user_name.clone(),
            time_range: self.time_range,
        }
    }
}

#[serde_as]
#[derive(Debug, Clone, Deserialize, Fields)]
pub struct ReservationForCreate {
    pub department_id: i64,
    pub doctor_id: i64,
    pub user_name: String,
	#[serde_as(as = "Rfc2822")]
    pub time_range: OffsetDateTime,
}

#[serde_as]
#[derive(Debug, Clone, Fields, Deserialize)]
pub struct ReservationForUpdate {
    pub department_id: i64,
    pub doctor_id: i64,

    pub user_name: String,
	#[serde_as(as = "Rfc2822")]
    pub time_range: OffsetDateTime,
}

#[derive(FilterNodes, Deserialize, Default, Debug)]
pub struct ReservationFilter {
	pub id: Option<OpValsInt64>,
	pub department_id: Option<OpValsInt64>,
	pub doctor_id: Option<OpValsInt64>,
	pub user_name: Option<OpValsString>,

	#[modql(to_sea_value_fn = "time_to_sea_value")]
	pub time_range:Option<OpValsValue>,
}

pub struct ReservationBmc;

impl DbBmc for ReservationBmc {
	const TABLE: &'static str = "reservation";
}

generate_common_bmc_fns!(
	Bmc: ReservationBmc,
	Entity: Reservation, 				// should be 'FromRow'
	ForCreate: ReservationForCreate,
	ForUpdate: ReservationForUpdate,
	Filter: ReservationFilter,
);

#[cfg(test)]
mod tests {
    use time::OffsetDateTime;

	#[test]
	fn test_date_time() {
		// println!("{:?}", OffsetDateTime::now_utc().format(DATE_TIME_FORMAT).unwrap());
		println!("{:?}", OffsetDateTime::now_utc())
	}
}