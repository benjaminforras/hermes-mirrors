export class FaqItem {
  Category: string;
  Messages: {
    question: string;
    answers: string[];
  }[];
}
