let { Repository } = require("./solution.js");
let {describe} = require('mocha');
let {assert, expect} = require('chai');

describe("Repository", () => {
    
    let current;

    beforeEach(() => {
        let properties = {
            name: 'string',
            age:'number',
            birthday: 'object'
        }
        current = new Repository(properties);
    });
        it("Constructor validation", () => {
            assert.isTrue(current.props.hasOwnProperty('name'));
            assert.isTrue(current.props.hasOwnProperty('age'));
            assert.isTrue(current.props.hasOwnProperty('birthday'));
            assert.isObject(current.props);
            assert.isFunction(current.nextId);
            assert.isTrue(current.data instanceof Map);
            assert.equal(current.data.size, 0);
        });

        it("Count", () => {
            const entity = {name: "Pesho", age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity);
            assert.equal(current.count, 1);
        });

        it("Add", () => {
            const entity = {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity);
            assert.deepEqual(current.data.get(0), entity);
            assert.deepEqual(current.getId(0), entity);
        });

        it("Add returns the right id",() => {
            const entity1 = {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            const entity2 = {name: 'Gosho', age: 38, birthday: new Date(1999, 0, 7)};
            assert.equal(current.add(entity1), 0);
            assert.equal(current.add(entity2), 1);
        });

        it("Get id should return the right entity", () => {
            const entity = {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity);
            assert.deepEqual(current.getId(0), entity);
        });

        it ("Update throws with invalid id", () => {
            const entity = {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            assert.throw(() => current.update(-2, entity), "Entity with id: -2 does not exist!");
            assert.throw(() => current.update(0, entity), "Entity with id: 0 does not exist!");
        });

        it("Update works with valid id", () => {
            const entity = {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity);
            const newEntity = {name: 'Gosho', age: 38, birthday: new Date(1998, 0, 7)};
            current.update(0, newEntity);
            assert.deepEqual(current.data.get(0), newEntity);
            assert.deepEqual(current.getId(0), newEntity);
        });

        it ("Update throws if entity is not valid", () => {
            const entity1 = {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity1);
            const entity2 = {name: 12, age: 38, birthday: new Date(1998, 0, 7)};
            const entity3 = {name2: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            assert.throw(() => current.update(0, entity2), "Property name is not of correct type!");
            assert.throw(() => current.update(0, entity3), "Property name is missing from the entity!");
        });

        it("Delete works with valid id", () => {
            const entity1= {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity1);
            const entity2 = {name: 'Gosho', age: 38, birthday: new Date(1998, 0, 7)};
            current.add(entity2);
            current.del(0);
            assert.equal(current.count, 1);
            assert.equal(current.data.get(0), undefined);
            assert.equal(current.data.size, 1);
        });

        it("Delete throws with invalid id", () => {
            const entity1= {name: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            current.add(entity1);
            const entity2 = {name: 'Gosho', age: 38, birthday: new Date(1998, 0, 7)};
            current.add(entity2);
            assert.throw(() => current.del(2), "Entity with id: 2 does not exist!");
            assert.throw(() => current.del(-2), "Entity with id: -2 does not exist!");
        });

        it("Validate function if property is missing", () => {
            const entity1 = {age: 22, birthday: new Date(1998, 0, 7)};
            const entity2 = {name: 'Pesho', birthday: new Date(1998, 0, 7)};
            const entity3 = {name: 'Pesho', age: 22};
            assert.throw(() => current.add(entity1), "Property name is missing from the entity!");
            assert.throw(() => current.add(entity2), "Property age is missing from the entity!");
            assert.throw(() => current.add(entity3), "Property birthday is missing from the entity!");
        });

        it("Validate function if property type is not correct", () => {
            const entity1= {name: 15, age: 22, birthday: new Date(1998, 0, 7)};
            const entity2= {name: 'Pesho', age: 'Hi', birthday: new Date(1998, 0, 7)};
            const entity3= {name: 'Pesho', age: 22, birthday: '3a'};
            assert.throw(() => current.add(entity1), "Property name is not of correct type!");
            assert.throw(() => current.add(entity2), "Property age is not of correct type!");
            assert.throw(() => current.add(entity3), "Property birthday is not of correct type!");
        });

        it("Validate function if property name is not correct", () => {
            const entity1= {name3: 'Pesho', age: 22, birthday: new Date(1998, 0, 7)};
            const entity2= {name: 'Pesho', age1: 22, birthday: new Date(1998, 0, 7)};
            const entity3= {name: 'Pesho', age: 22, birthday2: new Date(1998, 0, 7)};
            assert.throw(() => current.add(entity1), "Property name is missing from the entity!");
            assert.throw(() => current.add(entity2), "Property age is missing from the entity!");
            assert.throw(() => current.add(entity3), "Property birthday is missing from the entity!");
        });
    });



