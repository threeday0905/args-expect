A Tiny Tool to do the Runtime Argument Test
===========================================
We are always check the arguments in every function, such as below:

    function get(name) {
        if (!name || !name.length) {
            throw new Error();
        }

        // code body
    }

    funtion set(name, value) {
        if (typeof value !== 'object' ||
            !value.prop1 ||
            typeof value.prop2 !== 'number') {

            throw new Error();
        }

        // code body
    }


These checks are annoying but indispensable.

This tool provide a unified assertion checking for your project, like below:

    var expect = require('expect');
    function get(name) {
        expect(name).isString().notEmpty();

        // code body
    }

    funtion set(name, value) {
        expect(value).isObject()
            .has('prop1')
            .has( { 'prop2' :  Number} );

        //code body
    }


If any condition fail, it will throw error. (or log warn message)

The tool has very tiny size, and easily to use, especially in node.js .


---
### API List

1. expect(obj).isElement();
2. expect(obj).isObject()
3. expect(obj).isArray()
4. expect(obj).isFunction()
5. expect(obj).isBoolean()
6. expect(obj).isNull()
    - return true, if obj is **null** or **undefined**

7. expect(obj).isEmpty()
    - check if obj is null or undefined,
        or is string / array but has **zero length**.

8. expect(obj).notNull()
9. expect(obj).notEmpty()

10. expect(obj).is( type [,...] )
    - check if obj is match any of incoming types.

            expect(obj).is( String, Object ) // expect the object is String or Object
            expect(obj).is( CustomizeClass ) // expect the object is instance of CustomizeClass

11. expect(obj).has(propName)
    - check if obj is an Object and has all specified properties.

            expect(obj).has('key');
            expect(obj).has(['key', 'prop1']);
    - check if obj has all specified properties and match the given types.

            expect(obj).has({
                    key: String,
                    prop1: Number
               })

---
### Error Report Method

The default report method is throw an error.

We can use mode() to switch the report method:

    var expect = require('expect').mode('log');

    expect('123').isString();
    // it will log warning message on console

And it can run the specific report methods:

    var expect = require('expect').mode(function(msg) {
        alert(msg);
    });

    expect('123').isString();
    // it will alert warning message.

We can disable all assertion checking:

    require('excpet').disable();
    // it will disable all error report


---
### Module Standard Supported

This tool is support CommonJS, AMD, KMD, module standard.


---
### Questions?

If you have any questions, please feel free to create new issue.
