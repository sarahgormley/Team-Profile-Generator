const Engineer = require("../lib/Engineer");

test('creates an Engineer object', () => {
    const engineer = new Engineer('Mark', 1, 'Mark@gmail.com', 'Marky');
    
    expect(engineer.github) .toEqual(expect.any(String));
});

test('gets engineer github value', () => {
    const engineer = new Engineer('Mark', 1, 'Mark@gmail.com', 'Marky');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

test('gets role of employee', () => {
    const engineer = new Engineer('Mark', 1, 'Mark@gmail.com', 'Marky');

    expect(engineer.getRole()).toEqual("Engineer");
});