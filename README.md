Runtime Argument Test
======================
We are always check the arguments in every function, such as below:

    function get(name) {
        if (!name || !name.length) {
            throw new Error('name is empty');
        }

        // code body
    }

    funtion set(config) {
        if (typeof config !== 'object') {
            throw new Error('config must be an object');
        }

        if (!config.prop1) {
            throw new Error('must provide config.prop1');
        }

        if (!typeof config.prop2 !== 'number') {
            throw new Error('config.prop2 must be a number');
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

    funtion set(config) {
        expect(config).isObject()
            .has('prop1')
            .has( { 'prop2' :  Number} );

        //code body
    }


If any condition fail, it will throw error. (or any custom event).

The tool has very tiny size, and easily to use, especially in node.js .

---
### How to Use

NodeJS: install via npm:

    npm install args-expect

Browser:

    copy lib/args-expect-min.js to your project folder




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

11. expect(obj).toEqual( value )

12. expect(obj).is( type [,...] )
    - check if obj is match any of incoming types.

            expect(obj).is( String, Object ) // expect the object is String or Object
            expect(obj).is( CustomizeClass ) // expect the object is instance of CustomizeClass

13. expect(obj).has(propName)
    - check if obj is an Object and has all specified properties.

            expect(obj).has('key');
            expect(obj).has(['key', 'prop1']);
    - check if obj has all specified properties and match the given types.

            expect(obj).has({
                    key: String,
                    prop1: Number
               })

---
### Check Multi Args

    expect.all(1, 2, 3).isNumber();

use `expect.all()` to check multi arguments with one line


---
### Error Report Method

The default report method will throw error.

We can use `mode()` to create new expect obj with new report method:

    // create a new expect object with log report.
    var expect = require('expect').mode('log');

    expect('123').isString();
    // if any condition fail, it will log warning message on console

Or use any custom event

    // create a new expect object with alert report
    var expect = require('expect').mode(function(msg) {
        alert(msg);
    });

    expect('123').isString(); // it will alert warning message.

Since `mode()` will create new expect instance,
We can use `disable()` to disable all instance at one shot.

    require('excpet').disable();


---
### Get The Check Result

    // disable the report mode
    expect = expect.mode('none');
    var result = expect(1).isString();

    alert(expect.rejected);

use `result.rejected` to get the check result.

---
### Module Standard Supported

This tool is support CommonJS, AMD, KMD, module standard.


---
### Questions?

If you have any questions, please feel free to create new issue.
