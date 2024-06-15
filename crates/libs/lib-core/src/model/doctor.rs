use crate::ctx::Ctx;
use crate::generate_common_bmc_fns;
use crate::model::base::{self, DbBmc};
use crate::model::ModelManager;
use crate::model::Result;
use modql::{
	field::Fields,
	filter::{FilterNodes, ListOptions, OpValsInt64, OpValsString},
};
use sea_query::Nullable;
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;

#[derive(
	Default,
	Clone,
	Debug,
	sqlx::Type,
	derive_more::Display,
	PartialEq,
	Deserialize,
	Serialize,
)]
#[sqlx(type_name = "doctor_typ")]
pub enum DoctorTyp {
	Specialist,
	#[default]
	Basic,
}

impl From<DoctorTyp> for sea_query::Value {
	fn from(val: DoctorTyp) -> Self {
		val.to_string().into()
	}
}

impl Nullable for DoctorTyp {
	fn null() -> sea_query::Value {
		DoctorTyp::Basic.into()
	}
}

#[derive(Debug, Clone, Fields, FromRow, Serialize)]
pub struct QueryedDoctor {
	pub id: i64,

	pub department: String,

	pub name: String,
	pub title: DoctorTyp,
	pub thumbnail_url: Option<String>,
	pub profile: Option<String>,
}

#[derive(Debug, Clone, Fields, FromRow, Serialize)]
pub struct Doctor {
	pub id: i64,

	pub department_id: i64,

	pub name: String,
	pub title: DoctorTyp,
	pub thumbnail_url: Option<String>,
	pub profile: Option<String>,
}

impl Doctor {
	pub fn to_queryed_doctor(&self, department: String) -> QueryedDoctor {
		QueryedDoctor {
			id: self.id,
			department,
			name: self.name.clone(),
			title: self.title.clone(),
			thumbnail_url: self.thumbnail_url.clone(),
			profile: self.profile.clone(),
		}
	}
}

#[derive(Fields, Deserialize, Default)]
pub struct QueryedDoctorForCreate {
	pub department: String,

	pub name: String,

	#[field(cast_as = "doctor_typ")]
	pub title: DoctorTyp,

	pub thumbnail_url: Option<String>,

	pub profile: Option<String>,
}

impl QueryedDoctorForCreate {
	pub fn to_doctor4create(&self, department_id: i64) -> DoctorForCreate {
		DoctorForCreate {
			department_id,
			name: self.name.clone(),
			title: self.title.clone(),
			thumbnail_url: self.thumbnail_url.clone(),
			profile: self.profile.clone(),
		}
	}
}

#[derive(Fields, Deserialize, Default)]
pub struct DoctorForCreate {
	pub department_id: i64,

	pub name: String,

	#[field(cast_as = "doctor_typ")]
	pub title: DoctorTyp,

	pub thumbnail_url: Option<String>,

	pub profile: Option<String>,
}

#[derive(Fields, Deserialize, Default)]
pub struct QueryedDoctorForUpdate {
	pub department: Option<String>,

	pub name: Option<String>,

	#[field(cast_as = "doctor_typ")]
	pub title: Option<DoctorTyp>,

	pub thumbnail_url: Option<String>,

	pub profile: Option<String>,
}

impl QueryedDoctorForUpdate {
	pub fn to_doctor4update(&self, department_id: Option<i64>) -> DoctorForUpdate {
        DoctorForUpdate {
            department_id,
            name: self.name.clone(),
            title: self.title.clone(),
            thumbnail_url: self.thumbnail_url.clone(),
            profile: self.profile.clone(),
        }
    }
}

#[derive(Fields, Deserialize, Default)]
pub struct DoctorForUpdate {
	pub department_id: Option<i64>,

	pub name: Option<String>,

	#[field(cast_as = "doctor_typ")]
	pub title: Option<DoctorTyp>,

	pub thumbnail_url: Option<String>,

	pub profile: Option<String>,
}

#[derive(FilterNodes, Deserialize, Default, Debug)]
pub struct DoctorFilter {
	pub id: Option<OpValsInt64>,
	pub department: Option<OpValsString>,
	pub name: Option<OpValsString>,

	#[modql(cast_as = "doctor_typ")]
	pub title: Option<OpValsString>,

	pub thumbnail_url: Option<OpValsString>,
	pub profile: Option<OpValsString>,
}

pub struct DoctorBmc;

impl DbBmc for DoctorBmc {
	const TABLE: &'static str = "doctor";
}

generate_common_bmc_fns!(
	Bmc: DoctorBmc,
	Entity: Doctor,
	ForCreate: DoctorForCreate,
	ForUpdate: DoctorForUpdate,
	Filter: DoctorFilter,
);
