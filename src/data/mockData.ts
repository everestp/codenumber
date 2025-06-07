
export interface Question {
  id: string;
  title: string;
  code: string;
}

export interface Chapter {
  id: string;
  name: string;
  questions: Question[];
}

export interface Language {
  id: string;
  name: string;
  chapters: Chapter[];
}

export const mockData: Language[] = [
  {
    id: 'python',
    name: 'Python',
    chapters: [
      {
        id: 'variables',
        name: 'Variables',
        questions: [
          {
            id: 'hello-world',
            title: 'Write a program to print "Hello World"',
            code: `print("Hello World")`
          },
          {
            id: 'variables-basic',
            title: 'Create and print a variable',
            code: `name = "Python"\nprint(name)`
          },
          {
            id: 'string-concat',
            title: 'Concatenate two strings',
            code: `first_name = "John"\nlast_name = "Doe"\nfull_name = first_name + " " + last_name\nprint(full_name)`
          },
          {
            id: 'number-operations',
            title: 'Basic arithmetic operations',
            code: `a = 10\nb = 5\nprint(f"Sum: {a + b}")\nprint(f"Difference: {a - b}")\nprint(f"Product: {a * b}")\nprint(f"Division: {a / b}")`
          },
          {
            id: 'user-input',
            title: 'Get user input and display it',
            code: `name = input("Enter your name: ")\nage = input("Enter your age: ")\nprint(f"Hello {name}, you are {age} years old!")`
          },
          {
            id: 'type-conversion',
            title: 'Convert string to integer',
            code: `age = input("Enter your age: ")\nage = int(age)\nprint(f"In 10 years you will be {age + 10}")`
          }
        ]
      },
      {
        id: 'loops',
        name: 'Loops',
        questions: [
          {
            id: 'for-loop-basic',
            title: 'Print numbers 1 to 10 using for loop',
            code: `for i in range(1, 11):\n    print(i)`
          },
          {
            id: 'while-loop',
            title: 'Print numbers 1 to 10 using while loop',
            code: `i = 1\nwhile i <= 10:\n    print(i)\n    i += 1`
          },
          {
            id: 'list-iteration',
            title: 'Iterate through a list',
            code: `fruits = ["apple", "banana", "orange"]\nfor fruit in fruits:\n    print(fruit)`
          },
          {
            id: 'nested-loops',
            title: 'Print a simple pattern using nested loops',
            code: `for i in range(5):\n    for j in range(i + 1):\n        print("*", end="")\n    print()`
          },
          {
            id: 'loop-break',
            title: 'Break out of loop when number is 5',
            code: `for i in range(1, 11):\n    if i == 5:\n        break\n    print(i)`
          }
        ]
      }
    ]
  },
  {
    id: 'cpp',
    name: 'C++',
    chapters: [
      {
        id: 'functions',
        name: 'Functions',
        questions: [
          {
            id: 'hello-world-cpp',
            title: 'Write a program to print "Hello World"',
            code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World" << endl;\n    return 0;\n}`
          },
          {
            id: 'function-basic',
            title: 'Create a simple function',
            code: `#include <iostream>\nusing namespace std;\n\nvoid greet() {\n    cout << "Hello from function!" << endl;\n}\n\nint main() {\n    greet();\n    return 0;\n}`
          },
          {
            id: 'function-parameters',
            title: 'Function with parameters',
            code: `#include <iostream>\nusing namespace std;\n\nint add(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = add(5, 3);\n    cout << "Sum: " << result << endl;\n    return 0;\n}`
          },
          {
            id: 'function-return',
            title: 'Function returning a value',
            code: `#include <iostream>\nusing namespace std;\n\nint square(int num) {\n    return num * num;\n}\n\nint main() {\n    cout << "Square of 4: " << square(4) << endl;\n    return 0;\n}`
          }
        ]
      },
      {
        id: 'arrays',
        name: 'Arrays',
        questions: [
          {
            id: 'array-basic',
            title: 'Declare and initialize an array',
            code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int numbers[5] = {1, 2, 3, 4, 5};\n    for(int i = 0; i < 5; i++) {\n        cout << numbers[i] << " ";\n    }\n    return 0;\n}`
          },
          {
            id: 'array-sum',
            title: 'Find sum of array elements',
            code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int numbers[5] = {10, 20, 30, 40, 50};\n    int sum = 0;\n    for(int i = 0; i < 5; i++) {\n        sum += numbers[i];\n    }\n    cout << "Sum: " << sum << endl;\n    return 0;\n}`
          },
          {
            id: 'array-max',
            title: 'Find maximum element in an array',
            code: `#include <iostream>\nusing namespace std;\n\nint main() {\n    int numbers[5] = {3, 7, 2, 9, 5};\n    int max = numbers[0];\n    for(int i = 1; i < 5; i++) {\n        if(numbers[i] > max) max = numbers[i];\n    }\n    cout << "Max: " << max << endl;\n    return 0;\n}`
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    chapters: [
      {
        id: 'basics',
        name: 'Basics',
        questions: [
          {
            id: 'hello-world-js',
            title: 'Print "Hello World" to console',
            code: `console.log("Hello World");`
          },
          {
            id: 'variable-declare',
            title: 'Declare and print a variable',
            code: `let name = "JavaScript";\nconsole.log(name);`
          },
          {
            id: 'arithmetic-ops-js',
            title: 'Perform basic arithmetic operations',
            code: `let a = 10;\nlet b = 5;\nconsole.log("Sum:", a + b);\nconsole.log("Difference:", a - b);\nconsole.log("Product:", a * b);\nconsole.log("Division:", a / b);`
          }
        ]
      },
      {
        id: 'loops-js',
        name: 'Loops',
        questions: [
          {
            id: 'for-loop-js',
            title: 'Print numbers 1 to 10 using for loop',
            code: `for (let i = 1; i <= 10; i++) {\n  console.log(i);\n}`
          },
          {
            id: 'while-loop-js',
            title: 'Print numbers 1 to 10 using while loop',
            code: `let i = 1;\nwhile (i <= 10) {\n  console.log(i);\n  i++;\n}`
          },
          {
            id: 'array-iterate-js',
            title: 'Iterate over an array',
            code: `let fruits = ["apple", "banana", "mango"];\nfruits.forEach(fruit => console.log(fruit));`
          }
        ]
      }
    ]
  }
];
