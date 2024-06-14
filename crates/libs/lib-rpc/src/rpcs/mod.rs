// region:    --- Modules

mod macro_utils;
mod prelude;

pub mod agent_rpc;
pub mod conv_rpc;
pub mod department_rpc;
pub mod doctor_rpc;
pub mod reservation_rpc;

use rpc_router::{Router, RouterBuilder};

// endregion: --- Modules

pub fn all_rpc_router_builder() -> RouterBuilder {
	Router::builder()
		.extend(agent_rpc::rpc_router_builder())
		.extend(conv_rpc::rpc_router_builder())
		.extend(department_rpc::rpc_router_builder())
		.extend(doctor_rpc::rpc_router_builder())
		.extend(reservation_rpc::rpc_router_builder())
}
