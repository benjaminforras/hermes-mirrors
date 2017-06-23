import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

import "rxjs/add/operator/toPromise";

import {FaqItem} from "app/faq";

@Injectable()
export class FaqService {
  private faqsUrl = 'https://tryharddood.github.io/hermes-mirrors/app/faqs.json';  // URL to web api
  public faqs: Array<FaqItem> = [];

  constructor(private http: Http) {
  }

  loadFaqs(): void {
    this.faqs = null;
    this.http.get(this.faqsUrl).toPromise().then((response) => {
     this.faqs = (response.json() as FaqItem[]);
     }).catch(this.handleError);
  }

  getFaqItemsArray(): Array<FaqItem> {
    return this.faqs;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
