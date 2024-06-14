use crate::rpcs::prelude::*;
use lib_core::model::department::{
	Department, DepartmentBmc, DepartmentFilter, DepartmentForCreate, DepartmentForUpdate,
};

pub fn rpc_router_builder() -> RouterBuilder {
	router_builder!(
		// Same as RpcRouter::new().add...
		create_department,
		get_department,
		list_departments,
		update_department,
		delete_department,
	)
}

generate_common_rpc_fns!(
	Bmc: DepartmentBmc,
	Entity: Department,
	ForCreate: DepartmentForCreate,
	ForUpdate: DepartmentForUpdate,
	Filter: DepartmentFilter,
	Suffix: department
);