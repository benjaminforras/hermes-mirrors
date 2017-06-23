import {Component, OnInit} from "@angular/core";
import {FaqService} from "./_services/faq.service";
import {FaqItem} from "./faq";

@Component({
  selector: 'faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {
  faqsItems: FaqItem[];

  constructor(private faqService: FaqService) {
  }

  ngOnInit(): void {
    this.faqsItems = this.faqService.getFaqItemsArray();
  }
}
