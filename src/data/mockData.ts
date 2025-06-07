
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
            code: `name = "Python"
print(name)`
          },
          {
            id: 'string-concat',
            title: 'Concatenate two strings',
            code: `first_name = "John"
last_name = "Doe"
full_name = first_name + " " + last_name
print(full_name)`
          },
          {
            id: 'number-operations',
            title: 'Basic arithmetic operations',
            code: `a = 10
b = 5
print(f"Sum: {a + b}")
print(f"Difference: {a - b}")
print(f"Product: {a * b}")
print(f"Division: {a / b}")`
          },
          {
            id: 'user-input',
            title: 'Get user input and display it',
            code: `name = input("Enter your name: ")
age = input("Enter your age: ")
print(f"Hello {name}, you are {age} years old!")`
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
            code: `for i in range(1, 11):
    print(i)`
          },
          {
            id: 'while-loop',
            title: 'Print numbers 1 to 10 using while loop',
            code: `i = 1
while i <= 10:
    print(i)
    i += 1`
          },
          {
            id: 'list-iteration',
            title: 'Iterate through a list',
            code: `fruits = ["apple", "banana", "orange"]
for fruit in fruits:
    print(fruit)`
          },
          {
            id: 'nested-loops',
            title: 'Print a simple pattern using nested loops',
            code: `for i in range(5):
    for j in range(i + 1):
        print("*", end="")
    print()`
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
            code: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`
          },
          {
            id: 'function-basic',
            title: 'Create a simple function',
            code: `#include <iostream>
using namespace std;

void greet() {
    cout << "Hello from function!" << endl;
}

int main() {
    greet();
    return 0;
}`
          },
          {
            id: 'function-parameters',
            title: 'Function with parameters',
            code: `#include <iostream>
using namespace std;

int add(int a, int b) {
    return a + b;
}

int main() {
    int result = add(5, 3);
    cout << "Sum: " << result << endl;
    return 0;
}`
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
            code: `#include <iostream>
using namespace std;

int main() {
    int numbers[5] = {1, 2, 3, 4, 5};
    
    for(int i = 0; i < 5; i++) {
        cout << numbers[i] << " ";
    }
    
    return 0;
}`
          },
          {
            id: 'array-sum',
            title: 'Find sum of array elements',
            code: `#include <iostream>
using namespace std;

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};
    int sum = 0;
    
    for(int i = 0; i < 5; i++) {
        sum += numbers[i];
    }
    
    cout << "Sum: " << sum << endl;
    return 0;
}`
          }
        ]
      }
    ]
  }
];
