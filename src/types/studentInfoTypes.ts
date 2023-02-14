interface SimpleGrade {
    componentDesc: string;
    decimalValue: number;
    evtDate: string;
    notesForFamily: string;
    weightFactor: number;
}

interface RawGrade extends SimpleGrade {
    canceled: boolean;
    color: string;
    componentPos: number;
    displayPos: number;
    displayValue: string;
    evtCode: string;
    evtId: number;
    gradeMasterId: number;
    oldskillDesc: string;
    oldskillId: number;
    periodDesc: string;
    periodPos: number;
    skillCode: any;
    skillDesc: string;
    skillId: number;
    skillMasterId: number;
    skillValueDesc: string;
    skillValueShortDesc: any;
    subjectCode: string;
    subjectDesc: string;
    subjectId: number;
    underlined: boolean;
}

interface Grade {
    grades: RawGrade[];
}

interface Teacher {
    teacherId: number;
    teacherName: string;
}

interface RawSubject {
    id: number;
    description: string;
    order: number;
    teacher: Teacher[];
}

interface Subject {
    subjects: RawSubject[];
}

interface RawAbsence {
    evtCode: string;
    evtDate: string;
    evtId: number;
    evtHPos: number | null;
    evtValue: number | null;
    hoursAbsence: any[];
    isJustified: boolean;
    justifReasonCode: any;
    justifReasonDesc: any;
}

interface Absence {
    events: RawAbsence[];
}

interface RawLesson {
    authorName: string;
    classDesc: string;
    evtCode: string;
    evtDate: string;
    evtId: number;
    evtHPos: number;
    evtDuration: number;
    lessonArg: string;
    lessonType: string;
    subjectCode: any | null;
    subjectDesc: string;
    subjectId: number;
}

interface Lesson {
    lessons: RawLesson[];
}

interface HomeworkRecord {
    authorName: string;
    classDesc: string;
    evtCode: string;
    evtDatetimeBegin: string;
    evtDatetimeEnd: string;
    evtId: number;
    homeworkId: any | null;
    isFullDay: boolean;
    notes: string;
    subjectDesc: string;
    subjectId: number;
}

interface Agenda {
    agenda: HomeworkRecord[];
}


export {
    type SimpleGrade,
    type RawGrade,
    type Teacher,
    type RawSubject,
    type RawAbsence,
    type RawLesson,
    type HomeworkRecord,
    type Agenda,
    type Grade,
    type Subject,
    type Absence,
    type Lesson,

}
