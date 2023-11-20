const sorting = require("../../app");

describe("Books names test suit", () => {
  test("Books names should be sorted in ascending order", () => {
    let input = [
      "Гарри Поттер",
      "Властелин Колец",
      "Волшебник изумрудного города",
    ];
    let result = sorting.sortByName(input);
    let expected = [
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]
    expect(result).toEqual(expected);
  });
  test("No sorting", () => {
    let input = [
      "Властелин Колец",
      "Властелин Колец",
      "Властелин Колец",
  ];
    let result = sorting.sortByName(input);
    let expected = input;
    expect(result).toEqual(expected);
  })
});
