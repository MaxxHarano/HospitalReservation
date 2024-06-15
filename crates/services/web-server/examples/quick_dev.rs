#![allow(unused)] // For example code.

pub type Result<T> = core::result::Result<T, Error>;
pub type Error = Box<dyn std::error::Error>; // For examples.

use lib_core::model::reservation;
use serde_json::{json, Value};

#[tokio::main]
async fn main() -> Result<()> {
	let hc = httpc_test::new_client("http://localhost:8080")?;

	// hc.do_get("/index.html").await?.print().await?;

	let req_register = hc.do_post(
		"/api/register",
		json!({
			"username": "Detcher",
			"pwd_clear": "fuckyou",
			"phone": "19123456672",
			"id_card": "410221233456789009"
		}),
	);
	req_register.await?.print().await?;

	// -- Login
	let req_login = hc.do_post(
		"/api/login",
		json!({
			"username": "Detcher",
			"pwd": "fuckyou"
		}),
	);
	req_login.await?.print().await?;

	// // -- Create Reservation
	// let req_create_reservation = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "create_reservation",
	// 		"params": {
	// 			"data": {
	// 				"username": "fuckyou",
	// 				"department": "heart",
	// 				"doctor": "detcher",
	// 				"time_range":"Thu, 13 Jun 2024 16:00:00 GMT"
	// 			}
	// 		}
	// 	}),
	// );
	// let result = req_create_reservation.await?;
	// result.print().await?;
	// let reservation_id = result.json_value::<i64>("/result/data/id")?;

	// // -- Get Reservation
	// let req_get_reservation = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "get_reservation",
	// 		"params": {
	// 				"id": reservation_id,
	// 		}
	// 	}),
	// );
	// let result = req_get_reservation.await?;
	// result.print().await?;

	// // -- Create Reservation again
	// let req_create_reservation = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "create_reservation",
	// 		"params": {
	// 			"data": {
	// 				"username": "kunijiwa",
	// 				"department": "heart",
	// 				"doctor": "detcher",
	// 				"time_range":"Thu, 13 Jun 2024 18:00:00 GMT"
	// 			}
	// 		}
	// 	}),
	// );
	// let result = req_create_reservation.await?;
	// result.print().await?;
	// let reservation_id = result.json_value::<i64>("/result/data/id")?;

	// // -- Get Reservation again
	// let req_get_reservation = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "get_reservation",
	// 		"params": {
	// 				"id": reservation_id,
	// 		}
	// 	}),
	// );
	// let result = req_get_reservation.await?;
	// result.print().await?;

	// // -- List Reservations
	// let req_list_reservations = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "list_reservations",
	// 		"params": {
	// 				"filters": {
	// 					"id": {"$gt": 1},
	// 				},
	// 				"list_options": {

	// 				},
	// 		}
	// 	}),
	// );
	// let result = req_list_reservations.await?;
	// result.print().await?;

	// // -- Create Agent
	// let req_create_agent = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "create_agent",
	// 		"params": {
	// 			"data": {
	// 				"name": "agent AAA"
	// 			}
	// 		}
	// 	}),
	// );
	// let result = req_create_agent.await?;
	// result.print().await?;
	// let agent_id = result.json_value::<i64>("/result/data/id")?;

	// // -- Get Agent
	// let req_get_agent = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "get_agent",
	// 		"params": {
	// 				"id": agent_id
	// 		}
	// 	}),
	// );
	// let result = req_get_agent.await?;
	// result.print().await?;

	// // -- Create Conv
	// let req_create_conv = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "create_conv",
	// 		"params": {
	// 			"data": {
	// 				"agent_id": agent_id,
	// 				"title": "conv 01"
	// 			}
	// 		}
	// 	}),
	// );
	// let result = req_create_conv.await?;
	// result.print().await?;
	// let conv_id = result.json_value::<i64>("/result/data/id")?;

	// // -- Create ConvMsg
	// let req_create_conv = hc.do_post(
	// 	"/api/rpc",
	// 	json!({
	// 		"jsonrpc": "2.0",
	// 		"id": 1,
	// 		"method": "add_conv_msg",
	// 		"params": {
	// 			"data": {
	// 				"conv_id": conv_id,
	// 				"content": "This is the first comment"
	// 			}
	// 		}
	// 	}),
	// );
	// let result = req_create_conv.await?;
	// result.print().await?;
	// let conv_msg_id = result.json_value::<i64>("/result/data/id")?;

	// -- Logoff
	let req_logoff = hc.do_post(
		"/api/logoff",
		json!({
			"logoff": true
		}),
	);
	req_logoff.await?.print().await?;
	
	// */
	Ok(())
}
