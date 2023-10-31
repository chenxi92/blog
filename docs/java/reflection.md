Record some Java reflection usage.



## Usage cases

### 1. Invoke constructor method

Example Class:

```java
package com.peak.learningdemo;

public class Student {
    public Student() {
        System.out.println("created a new Student instance.");
    }
    public Student(String name) {
        this.name = name;
        System.out.println("create a new Student instance with default name: " + this.name);
    }
    private String name;
}
```



Test Class:

```java
public class Test {
    private static void testConstructorMethod() {
        try {
          	// 1. get the class
            Class<?> cls = Class.forName("com.peak.learningdemo.Student");
						
          	// 2.1 create instance without parameter
            Object instance1 = cls.getConstructor().newInstance();
          
          	// 2.2 create instance without parameter
            Object instance2 = cls.newInstance();
          
          	// 2.3 create instance with String parameter
            Object instance3 = cls.getConstructor(String.class).newInstance("peak");

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



Output:

```
I/System.out: created a new Student instance.
I/System.out: created a new Student instance.
I/System.out: create a new Student instance with default name: peak
```



### 2. Get and set value from field

Example class:

```java
package com.peak.learningdemo;
public class Student {
    public Student() {
        System.out.println("created a new Student instance.");
    }
    private String name;
}
```



Test class:

```java
public class Test {

    private static void testInstanceMethod() {
        try {
            // 1. get the class
            Class<?> cls = Class.forName("com.peak.learningdemo.Student");

            // 2. create the instance
            Object instance = cls.newInstance();

            // 3. get the field
            Field f = cls.getDeclaredField("name");
            // getField may retrieve from super class if needed
            // Field f = cls.getField("name")

            // 4. setup accessibility
          	// Java is not allowed to access the private field by default.
            f.setAccessible(true);

            // 5. set value for the field
            f.set(instance, "peak");

            // 6. retrieve the value
            System.out.println("student name: " + f.get(instance));
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        testInstanceMethod();
    }
}
```



Output:

```
I/System.out: created a new Student instance.
I/System.out: student name: peak
```



### 3. Invoke instance method

Example class:

```java
package com.peak.learningdemo;

public class Student {
    public Student() {
        System.out.println("created a new Student instance.");
    }
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }
}

```



Test class:

```java
public class Test {

    private static void testInstanceMethod() {
        try {
            // 1. get class name
            Class<?> cls = Class.forName("com.peak.learningdemo.Student");

            // 2. create instance
            Object instance = cls.newInstance();

            // 3.1 get the setter method
            Method setNameMethod = cls.getMethod("setName", String.class);
            // 3.2 invoke the setter method
            setNameMethod.invoke(instance, "peak");

            // 4.1 get the getter method, (no need to pass parameter type)
            Method getNameMethod = cls.getMethod("getName");
            // 4.2 invoke the setter method
            String name = (String) getNameMethod.invoke(instance);

            System.out.println("name is: " + name);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



Output:

```
I/System.out: created a new Student instance.
I/System.out: name is: peak
```



### 3. Invoke static method

Example class:

```java
package com.peak.learningdemo;
public class Student {
    public static void method1() {
        System.out.println("invoke Student.run().");
    }
    public static String method2(String value) {
        return "Hello " + value;
    }
}

```



Test class:

```java
public class Test {

    private static void testStaticMethod() {
        try {
            Class<?> cls = Class.forName("com.peak.learningdemo.Student");

            Method m1 = cls.getMethod("method1");
            // invoke static no need pass the instance object
            m1.invoke(null);

            Method m2 = cls.getMethod("method2", String.class);
            String value = (String) m2.invoke(null, "peak");

            System.out.println(value);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```



Output:

```
```

