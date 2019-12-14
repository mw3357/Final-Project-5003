const assert = require('assert');
const grouping = require('../../src/grouper/grouping');
const groupBySkills = grouping.groupBySkills;
const groupingScore = grouping.groupingScore;

describe('Test All Groupers', () => {
    it('group by skills validation', () => {
        function student(id, name, skills) {
            this.id = id;
            this.name = name;
            this.skills = skills;
        }
        const Jim = new student(1, 'Jim', ['Java']); //
        const Joe = new student(2, 'Joe', ['Html', 'Css', 'UIUX']);
        const Mary = new student(3, 'Mary', ['Java', 'Html', 'Css']);
        const Rose = new student(4, 'Rose', ['Java', 'Javascript']);
        const John = new student(5, 'John',  ['Html', 'UIUX']);//
        const Lee = new student(6, 'Lee', ['Javascript']);
        const Jill = new student(7, 'Jill', ['UIUX', 'Html', 'Css','Javascript']);//
        const Rocky = new student(8, 'Rocky', ['UIUX', 'Css']);
        const Issac = new student(9, 'Issac', ['Javascript', 'Html', 'Css']);
        const persons = [Jim, Joe, Mary, Rose, John, Lee, Jill, Rocky, Issac];

        //expect case 1: 36, 12, 45 => 4+3+3
        //157, 489, 236 => 5+5+
        const expectedGroupScore = 15;
        const expectedTeamSize = 3;
        const teams = groupBySkills(persons, 3, ['Java', 'Html', 'Css', 'Javascript', 'UIUX']);
        const actualTeamScore = groupingScore(teams);
        assert.equal(expectedTeamSize, teams.length);
        assert.ok(expectedGroupScore * 0.8 <= actualTeamScore);
    });
    it('group by fewer skills validation', () => {
        function student(id, name, skills) {
            this.id = id;
            this.name = name;
            this.skills = skills;
        }
        const Jim = new student(1, 'Jim', ['Java']); 
        const Joe = new student(2, 'Joe', ['Html', 'UIUX']);//
        const Mary = new student(3, 'Mary', ['Java', 'Html', 'Css']);//
        const Rose = new student(4, 'Rose', ['Java', 'Javascript']);//
        const John = new student(5, 'John',  ['Html']);
        const Lee = new student(6, 'Lee', ['Javascript']);//
        const Jill = new student(7, 'Jill', ['UIUX', 'Css','Javascript']);//
        const Rocky = new student(8, 'Rocky', ['UIUX', 'Java']);
        const Issac = new student(9, 'Issac', ['Html', 'Css']);
        const persons = [Jim, Joe, Mary, Rose, John, Lee, Jill, Rocky, Issac];

        //7 36 24 19 58   3+4+4+3+3
        const expectedGroupScore = 17;
        const expectedTeamSize = 5;
        const teams = groupBySkills(persons, 2, ['Java', 'Html', 'Css', 'Javascript', 'UIUX']);
        const actualTeamScore = groupingScore(teams);
        assert.equal(expectedTeamSize, teams.length);
        assert.ok(expectedGroupScore * 0.8 <= actualTeamScore);
    });

    it('group by fewer members validation', () => {
        function student(first_name, last_name, skills) {
            this.first_name = first_name;
            this.last_name = last_name;
            this.skills = skills;
        }
        const Jim = new student('Jim', 'Doe', ['Java']); 
        const Joe = new student('Joe', 'Mosby', ['Html', 'UIUX']);//
        const Mary = new student('Mary', 'Dundhum', ['Java', 'Html', 'Css']);//
        const persons = [Jim, Joe, Mary];

        //7 36 24 19 58   3+4+4+3+3
        const expectedGroupScore = 3;
        const expectedTeamSize = 1;
        const teams = groupBySkills(persons, 3, ['Java', 'Html', 'Css', 'Javascript', 'UIUX']);
        const actualTeamScore = groupingScore(teams);
        assert.equal(expectedTeamSize, teams.length);
        assert.ok(expectedGroupScore * 0.8 <= actualTeamScore);
    });
})
