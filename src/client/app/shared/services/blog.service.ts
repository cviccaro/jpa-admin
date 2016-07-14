import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { XhrService } from './xhr';

@Injectable()
export class BlogService {

	constructor(public http: Http, public xhr: XhrService) {
		this.http = http;
	}

    /**
     * Get all projects with filters and sorts
     * @param {number}  id 
     * @return Observable<any>
     */
	all(params: {} = {}): Observable<any> {
		let query = new URLSearchParams();

		for (var key in params) {
			const param: string = params[key];
			query.set(key, param);
		}

        this.xhr.started();

	    return this.http.get('/blogs/paged', {search: query})
	        .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}

    /**
     * Find a project by ID
     * @param {number}  id 
     * @return Observable<any>
     */
	find(id: number): Observable<any> {
        this.xhr.started();

        return this.http.get(`/blogs/${id}`)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
	}
    /**
     * Destroy a blog by ID
     * @param {number}  id 
     * @return Observable<any>
     */
    destroy(id: number): Observable<any> {
        this.xhr.started();

        return Observable.create(observer => {
            this.http.delete(`/blogs/${id}`)
                .subscribe(res => {
                    this.xhr.finished();
                    observer.next();
                    observer.complete();
                });
        });
    }
    /**
     * Create a new project
     * @param {[type]} attributes [description]
     */
    create(attributes: { [key: string] : any}): Observable<any> {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.http.post('/blogs', form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * Update an existing project
     * @param {[type]} id         [description]
     * @param {[type]} attributes [description]
     */
    update(id: number, attributes: { [key: string] : any}): Observable<any> {
        let form = this.createFormData(attributes);

        this.xhr.started();

        return this.http.post(`/blogs/update/${id}`, form)
            .map(res => {
                this.xhr.finished();
                return res.json();
            });
    }

    /**
     * [createFormData description]
     * @param {[key: string] : any} attributes [description]
     * @return FormData
     */
    private createFormData(attributes: {[key: string] : any}): FormData {
        let form = new FormData();

        for (let key in attributes) {
            let val = attributes[key];

            switch(key) {
                case 'images':
                    break;
                case 'image':
                    if (val === '') {
                        form.append(key, val);
                    } else if (!!val && val._file) {
                        form.append(key, val._file);
                    }
                    break;
                case 'divisions':
                case 'tags':
                    val.forEach((item,i) => {
                        for (let k in item) {
                            form.append(`${key}[${i}][${k}]`, item[k]);
                        }
                    });
                    break;
                default:
                    if (val !== undefined && val !== null) form.append(key, val);
            }
        }

        return form;
    }
}