A Tiny Tool to do the Runtime Argument Test
===========================================
We ofter do the arguments checks in every function, such as below:

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

But we can use this tool to provide a unified assertion checking, as below:

    var expect = require('expect);
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

The tool has very tiny size, and easily to use. Especially in node.js .


---
### API List
1. expect(obj).isElement();
2. expect(obj).isObject()
3. expect(obj).isArray()
4. expect(obj).isFunction()
5. expect(obj).isBoolean()
6. expect(obj).isNull()
    - return true, if obj is **null** or **undefined**
6. expect(obj).isEmpty()
    - return true, if obj is null or undefined
    - return true, if obj is string or array. but length is zero.

8. expect(obj).notNull()
9. expect(obj).notEmpty()

10. expect(obj).is( type [,...] )
    - check obj is match any of incomint type.

            expect(obj).is( String, Object )
            expect(obj).is( CustomizeClass )

11. expect(obj).has(propName)
    - check obj is an Object, and has the specified properties.

            expect(obj).has('key');
            expect(obj).has(['key', 'prop1']);

    - check obj has all specified properties and match the type.

            expect(obj).has({
                    key: String,
                    prop1: Number
               })

---
### Error Report Method

The default report method is throw an an error.

We can use mode to switch the report method:

    var except = require('excpet').mode('log');

    except('123').isString();
    // it will log warning message on console

And it can run the specific report methods:

    var except = require('except').mode(function(msg) {
        alert(msg);
    });

    except('123').isString();
    // it will alert warning message.

We can disable all assertion checking:

    require('excpet').disable();
    // it will disable all error report


---
### Reading Order

All files on src folder, the reading order as below:

1. header.snippet
2. check-tools.js
3. error-message.js
4. reject-handler.js
5. expect-chain.js
6. expect-entrance.js
7. exports.js
8. footer.snippet

---
### Questions?

If you have any questions, please feel free to create new issue.
