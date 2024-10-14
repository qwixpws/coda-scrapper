import assert from 'node:assert';
import { warn } from 'node:console';
export const tableSchemaEnum = [
    { id: 'c-V2SDbtkZtq', name: 'Дата' },
    { id: 'c-AtN7a0i0D7', name: 'Время' },
    { id: 'c-jySyPRgWLY', name: 'Учитель' },
    { id: 'c-LjnYVWCLuN', name: 'Тема' },
    { id: 'c-joYiAOlxnF', name: 'Направления' },
    { id: 'c-dDZnQXJ6ZR', name: 'lesson type' },
    { id: 'c-EbfvAzSjFa', name: 'поток' },
    { id: 'c-bopEC9DbQO', name: '🥷Замена [кого]' },
    { id: 'c-z2klBE2VsV', name: 'Замена [кем | на кого]🥷' },
    { id: 'c-YRfgjm-OQb', name: 'Comment' },
    { id: 'c-DeKYKLKyds', name: 'Длительность ' },
    { id: 'c-XJG1rPHHEj', name: 'Карточка' },
    { id: 'c-nxf_8cbLXP', name: 'Дроны' },
    { id: 'c-mDr8WVeYSe', name: 'Питон' },
    { id: 'c-LXnltQzh6y', name: 'JS' }
];

const teachers = [
    {
        teacherName: 'Мария',
        hours: 0,
        hours_2nd: 0,
        lessons: [],
        courses: [],
        tableId: '',
    }
]

const colNameId = tableSchemaEnum.filter((column) => column.name === 'Учитель')[0].id;

export class Teacher {
    constructor(row) {
        if (!row.values) return;

        const teacherName = row.values[colNameId];

        if (teacherName && teacherName.includes(',')) {
            const [teacherName1, _] = teacherName.split(',');
            this.teacherName = teacherName1.trim();
        } else {
            this.teacherName = teacherName.trim();
        }

        this.courses = [];
        this.lessons = [];
        this.hours = 0;
        this.hours_2nd = 0;
    }

    static addCourse(course) {
        if (!this.courses.includes(course)) {
            this.courses.push(course);
        }
    }

    static getTeacherByName(teacherName) {
        if ( teacherName && teacherName.includes(',')) {
            const [teacherName1, _] = teacherName.split(',');
            teacherName = teacherName1.trim();
        } else {
            teacherName = teacherName.trim();
        }
        console.log(teachers.find((item) => item.teacherName === teacherName));
        return teachers.find((item) => item.teacherName === teacherName);
    }

    static getTeacherAssistant(row) {
        let teacherName = row.values[colNameId];
        if (teacherName.includes(',')) {
            const [teacherName1, teacherName2] = teacherName.split(',');
            teacherName = teacherName2.trim();
            return teachers.find((item) => item.teacherName === teacherName);
        }
        return false;
    }

    static getTeacher(row) {
        let teacherName = row.values[colNameId];

        if (this.getTeacherByName(teacherName)) {
            return this.getTeacherByName(teacherName);
        }

        const newTeacher = new Teacher(row);
        teachers.push(newTeacher);
        return newTeacher;
    }

    static addLesson(row) {
        if (!row.values) return;
        const lesson = {
            date: row.values[tableSchemaEnum.filter((column) => column.name === 'Дата')[0].id],
            time: row.values[tableSchemaEnum.filter((column) => column.name === 'Время')[0].id],
            type: row.values[tableSchemaEnum.filter((column) => column.name === 'lesson type')[0].id],
            theme: row.values[tableSchemaEnum.filter((column) => column.name === 'Тема')[0].id],
            duration: parseInt(row.values[tableSchemaEnum.filter((column) => column.name === 'Длительность ')[0].id]),
            teacher: row.values[tableSchemaEnum.filter((column) => column.name === 'Учитель')[0].id],
        };
        const teacher = this.getTeacher(row);
        const teacherAssistant = this.getTeacherAssistant(row);
        if (teacherAssistant) {
            teacherAssistant.addSecondaryHours(lesson.duration);
            teacherAssistant.lessons.push(lesson);
        }

        teacher.addMainHours(lesson.duration);
        teacher.lessons.push(lesson);
        return teacher;
    }

    addMainHours(hours) {
        if (!hours) return;
        this.hours += hours;
    }
    addSecondaryHours(hours) {
        if (!hours) return;
        this.hours_2nd += hours;
    }

    static getTeachers() {
        return teachers;
    }

    static getTeachersStats() {
        const teachers = this.getTeachers();
        teachers.sort((a, b) => a.hours - b.hours);
        const result = teachers.map((item) => {
            return {
                teacherName: item.teacherName,
                hours: item.hours,
                hours_2nd: item.hours_2nd
            }
        })
        return result;
    }

    static fromJson(item) {
        if (teachers.includes(item)) {
            return item;
        }
        const teacherName = new Teacher(item);
        teachers.push(teacherName);
        teacherName.hours = item.hours;
        teacherName.hours_2nd = item.hours_2nd;
        return teacherName;
    }
}

//assert.equal(new Teacher({ teacherName: 'Мария', hours: 0, hours_2nd: 0 }), teachers[0]);
//assert.equal(new Teacher({ teacherName: 'To', hours: 0, hours_2nd: 0 }).teacherName, 'To');
//assert.equal(new Teacher({ teacherName: 'To', hours: 0, hours_2nd: 0 }).hours, 0);
