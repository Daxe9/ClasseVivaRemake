type SimpleGrade = {
    componentDesc: string,
    decimalValue: number,
    evtDate: string,
    notesForFamily: string,
    weightFactor: number,
}

type RawGrade = SimpleGrade & {
    canceled: boolean,
    color: string,
    componentPos: number,
    displayPos: number,
    displayValue: string,
    evtCode: string,
    evtId: number,
    gradeMasterId: number,
    oldskillDesc: string,
    oldskillId: number,
    periodDesc: string,
    periodPos: number,
    skillCode: any,
    skillDesc: string,
    skillId: number,
    skillMasterId: number,
    skillValueDesc: string,
    skillValueShortDesc: any,
    subjectCode: string,
    subjectDesc: string,
    subjectId: number,
    underlined: boolean,
}

type Grade = {
    grades: RawGrade[],
}

type Teacher = {
    teacherId: number,
    teacherName: string,
}

type RawSubject = {
    id: number,
    description: string,
    order: number,
    teacher: Teacher[],
}

type Subject = {
    subjects: RawSubject[],
}

type RawAbsence = {
    evtCode: string,
    evtDate: string,
    evtId: number,
    evtHPos: number | null,
    evtValue: number | null,
    hoursAbsence: any[],
    isJustified: boolean,
    justifReasonCode: any,
    justifReasonDesc: any,
}

type Absence = {
    events: RawAbsence[],
}

type RawLesson = {
    authorName: string,
    classDesc: string,
    evtCode: string,
    evtDate: string,
    evtId: number,
    evtHPos: number,
    evtDuration: number,
    lessonArg: string,
    lessonType: string,
    subjectCode: any | null,
    subjectDesc: string,
    subjectId: number,
}

type Lesson = {
    lessons: RawLesson[],
}

type HomeworkRecord = {
    authorName: string,
    classDesc: string,
    evtCode: string,
    evtDatetimeBegin: string,
    evtDatetimeEnd: string,
    evtId: number,
    homeworkId: any | null,
    isFullDay: boolean,
    notes: string,
    subjectDesc: string,
    subjectId: number,
}

type Agenda = {
    agenda: HomeworkRecord[],
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
