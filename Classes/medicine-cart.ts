export class MedicineCart {
    constructor(
        //מזהה סל
        public IdMedicineCart: number = 0,
        //מזהה לקוח
        public IdUserMedicineCart: string = "",
        //תרופה
        public Medicine: any,
        //כמות לנטילה
        public Amount: number,
        //תדירות
        public Frequency: number,
        //זמנים לנטילה
        public FrequencyOnDay: string = "",
        //אופן הנטילה-עם/בלי/אחרי אוכל
        public Food: number = 0,
        //מס ימים לנטילה
        public NumDateToTake: number = 0,
        //סה"כ כדורים /טבליות וכו...
        public TotalQuantity: number,
        //מצב התרופה סטטוס :פעיל/ממתין לקניה/מלאי
        public MediicneStatus: string = "Wait"
    ) { }
}
