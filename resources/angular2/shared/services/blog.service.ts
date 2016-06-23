import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {
	constructor(public http: Http) {
		this.http = http;
	}

	all(params: {} = {}) {
		let query = new URLSearchParams();
		for (var key in params) {
			const param: string = params[key];
			query.set(key, param);
		}

	    return this.http.get('/blogs', {search: query})
	        .map((res) => res.json());
	}
}