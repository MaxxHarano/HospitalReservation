use crate::ctx::Ctx;
use crate::generate_common_bmc_fns;
use crate::model::base::{self, DbBmc};
use crate::model::ModelManager;
use crate::model::Result;
use modql::{field::Fields, filter::{ListOptions, FilterNodes, OpValsInt64, OpValsString}};
use serde::{Deserialize, Serialize};
use sqlx::prelude::FromRow;



// region:    --- Department Types

#[derive(Debug, Clone, Fields, FromRow, Serialize)]
pub struct Department {
    pub id: i64,
    pub name: String,
}

#[derive(Fields, Deserialize)]
pub struct DepartmentForCreate {
    pub name: String,
}

#[derive(Fields, Deserialize)]
pub struct DepartmentForUpdate {
    pub name: Option<String>,
}

#[derive(FilterNodes, Default, Deserialize)]
pub struct DepartmentFilter {
    pub id: Option<OpValsInt64>,
    pub name: Option<OpValsString>,
}

// endregion: --- Department Types

// region:    --- DepartmentBmc

pub struct DepartmentBmc;

impl DbBmc for DepartmentBmc {
    const TABLE: &'static str = "department";
}

generate_common_bmc_fns!(
    Bmc: DepartmentBmc,
    Entity: Department,
    ForCreate: DepartmentForCreate,
    ForUpdate: DepartmentForUpdate,
    Filter: DepartmentFilter,
);

// endregion: --- DepartmentBmc

// region:    --- Tests

// endregion: --- Tests