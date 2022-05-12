import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

export interface ArticleTemplate {
    link?: string // a clickable link
    type?: string // the memex type, can be tool, podcast, list, music, article, book, video, lecture, image, quote, note, term, game, encyclopedia... Trackable on the left bar
    date?: string // a date, can be anything
    tags?: string[] // trackable on the left bar
    done?: boolean // true/false can be used to check the item status, trackable on the left bar
    quote?: string // a quote
    author?: string // the author, will only show if there is a quote
    fileUrl?: string // can be a file link or an image to be shown
    note?: string // a note, for example description etc.
    project?: string // a project, visible on the left bar
    term?: string // the term described
    person?: string // Person?
    revised?: boolean // Set to true if this article has been updated
    source?: string // How you found out about the content
}

@Component ({
    selector: 'app-memex',
    templateUrl: './memex.component.html',
    styleUrls: [ './memex.component.scss' ]
})
export class MemexComponent implements OnInit, AfterViewInit {

    private ARTICLE_WIDTH: number = 1;
    private CONTENT_GAP: number = 20;

    @ViewChild('contentContainer')
    contentContainer!: ElementRef;

    @ViewChild('main')
    main!: ElementRef;

    private _contentContainerWidth: number = 0;
    private _maxColumns: number = 0;

    articles: ArticleTemplate[] = [];

    constructor () {
    }

    ngOnInit (): void {
    }

    ngAfterViewInit (): void {
        this.calculateWidths();
    }

    calculateWidths() {
        this._contentContainerWidth = this.contentContainer.nativeElement.offsetWidth;
        this._maxColumns = this._contentContainerWidth / this.ARTICLE_WIDTH;
        console.log(this._maxColumns - this.CONTENT_GAP)
    }



}
