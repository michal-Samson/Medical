export class MedicineDetails {
    constructor(
        //מבנה של תרופה כפי שמופיע באתר של משרד הבריאות
        public activeComponents: Array<string> = [],
        public activeComponentsCompareName: string,
        //שם מרכיב פעיל
        public activeComponentsDisplayName: string = "",
        //ברקוד
        public barcodes: string = "",
        public bitulDate: string = "",
        public customerPrice: string = "",
        public dbVersiob: string = "",
        public dosageForm: string = "",
        //שם אנגלית
        public dragEnName: string = "",
        //שם עברית
        public dragHebName: string = "",
        public dragRegDate: "",
        public dragRegNum: "",
        public dragRegOwner: "",
        public health: boolean,
        //מערך תמונות
        public images: Array<string> = [],
        public indications: string = "",
        public iscanceled: boolean,
        public packages: Array<string> = [],
        public packagesPrices: Array<string> = [],
        public pages: number,
        public prescription: boolean,
        public results: boolean,
        public route: string = "",
        //סיפטום
        public secondarySymptom: any,
        public singlePrice: string = "",
        //אופן הנטילה
        public usageForm: string = "",
        public usageList: Array<string> = []
    ) { }
}
