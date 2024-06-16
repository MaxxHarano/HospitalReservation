// region:    --- Modules

mod config;
mod error;
mod log;
mod web;

pub use self::error::{Error, Result};
use axum::http::Method;
use config::web_config;

use crate::web::mw_auth::{mw_ctx_require, mw_ctx_resolver};
use crate::web::mw_req_stamp::mw_req_stamp_resolver;
use crate::web::mw_res_map::mw_reponse_map;
use crate::web::{routes_login, routes_static};
use axum::{http, middleware, Router};
use lib_core::_dev_utils;
use lib_core::model::ModelManager;
use tokio::net::TcpListener;
use tower_cookies::CookieManagerLayer;
use tracing::info;
use tracing_subscriber::EnvFilter;
use tower_http::cors:: CorsLayer;
use http::HeaderValue;
use http::header::{AUTHORIZATION, ACCEPT, CONTENT_TYPE};

// endregion: --- Modules

#[tokio::main]
async fn main() -> Result<()> {
	tracing_subscriber::fmt()
		.without_time() // For early local development.
		.with_target(false)
		.with_env_filter(EnvFilter::from_default_env())
		.init();

	// -- FOR DEV ONLY
	_dev_utils::init_dev().await;

	let mm = ModelManager::new().await?;

	// -- Define Routes
	let routes_rpc = web::routes_rpc::routes(mm.clone())
		.route_layer(middleware::from_fn(mw_ctx_require));

	let routes_all = Router::new()
		.merge(routes_login::routes(mm.clone()))
		.nest("/api", routes_rpc)
		.layer(middleware::map_response(mw_reponse_map))
		.layer(middleware::from_fn_with_state(mm.clone(), mw_ctx_resolver))
		.layer(CookieManagerLayer::new())
		.layer(middleware::from_fn(mw_req_stamp_resolver))
		.layer(CorsLayer::new().allow_methods([Method::GET, Method::POST, Method::DELETE])
								.allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
								.allow_headers([AUTHORIZATION, ACCEPT, CONTENT_TYPE])
								.allow_credentials(true))
		.fallback_service(routes_static::serve_dir());

	// region:    --- Start Server
	// Note: For this block, ok to unwrap.
	let listener = TcpListener::bind("127.0.0.1:8080").await.unwrap();
	info!("{:<12} - {:?}\n", "LISTENING", listener.local_addr());
	axum::serve(listener, routes_all.into_make_service())
		.await
		.unwrap();
	// endregion: --- Start Server

	Ok(())
}
