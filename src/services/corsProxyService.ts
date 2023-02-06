import { invoke } from "@tauri-apps/api";

// set default headers and base url
// TODO: axios client
const BASEURL: string = "https://web.spaggiari.eu/rest/v1";

const defaultHeaders = {
	"Content-Type": "application/json",
	"Z-Dev-Apikey": "+zorro+",
	"User-Agent": "zorro/1.0"
};

export async function getRequest(route: string, headers?: any): Promise<any> {
	const request: any = {
		url: BASEURL + route,
		headers: { ...defaultHeaders }
	};

	if (headers) {
		for (const key of Object.keys(headers)) {
			request.headers[key] = headers[key];
		}
	}

	try {
		const result: any = await invoke("get_request", request);
		console.log(result);

		// parse body
		result.body = JSON.parse(result.body);
		if (result.body.hasOwnProperty("error")) {
			throw new Error(result.body.message ?? result.body.error);
		}
		return result;
	} catch (error: any) {
		return Promise.reject(error);
	}
}

// https://web.spaggiari.eu/tools/app/default/get_username.php

// rust function signature
// pub async fn post_request(url: &str, body: &str, headers: Option<HashMap<&str, &str>>) -> Result<ResponseData, APIError>
export async function postRequest(
	route: string,
	body?: any,
	headers?: any
): Promise<any> {
	const request: any = {
		url: BASEURL + route,
		headers: { ...defaultHeaders }
	};

	// body has to be a stringified
	if (body) {
		request.body = JSON.stringify(body);
	}

	if (headers) {
		for (const key of Object.keys(headers)) {
			request.headers[key] = headers[key];
		}
	}

	try {
		const result: any = await invoke("post_request", request);
		// parse body
		result.body = JSON.parse(result.body);
		if (result.body.hasOwnProperty("error")) {
			throw new Error(result.body.message ?? result.body.error);
		}
		return result;
	} catch (error: any) {
		return Promise.reject(error);
	}
}
