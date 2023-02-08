// TODO: share client for all requests
use reqwest::header::{HeaderValue, HeaderMap};
use std::collections::HashMap;
use serde::Serialize;
use serde_json::Value;

#[derive(Debug, Serialize)]
pub struct ResponseData {
    body: String,
    headers: HashMap<String, String>,
}

impl ResponseData {
    pub fn new(tmp_headers: HeaderMap, body: String) -> Self {
        let mut headers: HashMap<String, String> = HashMap::new(); 
        for (key, value) in tmp_headers.iter() {
            headers.insert(key.to_string(), value.to_str().unwrap().to_string());
        }
        Self {
            headers,
            body
        }
    }
}

// NOTE: https://jonaskruckenberg.github.io/tauri-docs-wip/development/inter-process-communication.html#error-handling
#[derive(Debug, thiserror::Error)]
pub enum APIError {
    #[error("Generic Error")]
    GenericError(#[from] std::io::Error),
    #[error("Request error")]
    RequestError(#[from] reqwest::Error),
    #[error("JSON error")]
    ParseError(#[from] serde_json::Error),
}
// we must manually implement serde::Serialize
impl serde::Serialize for APIError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::ser::Serializer,
        {
            serializer.serialize_str(self.to_string().as_ref())
        }
}

#[tauri::command]
pub async fn get_request(url: &str, headers: Option<HashMap<&str, &str>>) -> Result<ResponseData, APIError> {
    let header_map = get_headers(headers);

    let client = reqwest::Client::new();

    // make get request
    let raw_result = client.get(url).headers(header_map).send().await?;

    // get complementary data
    let headers = raw_result.headers().clone();

    // create the response data to send back to the frontend
    let response_data = ResponseData::new(
        headers,
        raw_result.text().await?,
    );

    Ok(response_data)
}

fn get_headers(headers: Option<HashMap<&str, &str>>) -> HeaderMap {

    match &headers {
        None => HeaderMap::new(),
        Some(h) => {
            let mut header_map = HeaderMap::new();
            for (key, value) in h.iter() {
                let value: HeaderValue = match value.parse() {
                    Err(_) => continue,
                    Ok(v) => v
                };
                
                // convert key from &str to &'static str
                let key: &'static str = unsafe { std::mem::transmute(key.as_bytes()) };
                
                header_map.insert(key, value);
            }
            header_map
        }
    }
}

#[tauri::command]
pub async fn post_request(url: &str, body: &str, headers: Option<HashMap<&str, &str>>) -> Result<ResponseData, APIError> {
    // TODO: add headers
    // parse the body
    let body: Value = serde_json::from_str(body)?;

    let header_map = get_headers(headers);
        // inizialize the client
    let client = reqwest::Client::new();
    
    // make the post request with given body
    let raw_result = match client.post(url).headers(header_map).json(&body).send().await {
        Ok(v) => v,
        Err(err) => return Err(APIError::RequestError(err))
    };

    // get complementary data
    let headers = raw_result.headers().clone();
    
    // create the response data to send back to the frontend
    let response_data = ResponseData::new(
        headers,
        raw_result.text().await?,
        );

    Ok(response_data)
}
