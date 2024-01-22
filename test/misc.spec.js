const diff = require('../js/htmldiff');

describe('htmldiffer', function () {
	it('should return unchanged text when both inputs are the same', function () {
		const response = diff('input text', 'input text');
		expect(response).to.equal('input text');
	});

	it('should mark new letter added', function () {
		const response = diff('input', 'input 2');
		expect(response).to.equal('input<ins data-operation-index="1"> 2</ins>');
	});

	it('should mark letter deleted', function () {
		const response = diff('input 2', 'input');
		expect(response).to.equal('input<del data-operation-index="1"> 2</del>');
	});

	it('should support img tags insertion', function () {
		const before = 'a b c';
		const after = 'a b <img src="some_url" /> c';
		const html = diff(before, after);
		expect(html).to.equal('a b <ins data-operation-index="1"><img src="some_url" /> </ins>c');
	});

	it('should support img tags deletion', function () {
		const before = 'a b <img src="some_url" /> c';
		const after = 'a b c';
		const html = diff(before, after);
		expect(html).to.equal('a b <del data-operation-index="1"><img src="some_url" /> </del>c');
	});

	it('should ins if before does not exist', function () {
		const after = 'a b c';
		const html = diff(null, after);
		expect(html).to.equal('<ins data-operation-index="0">a b c</ins>');
	});

	it('should del if after does not exist', function () {
		const before = 'a b c';
		const html = diff(before, undefined);
		expect(html).to.equal('<del data-operation-index="0">a b c</del>');
	});

	it('should return empty string if before and after are falsey', function () {
		const before = false;
		const after = 0;
		const html = diff(before, after);
		expect(html).to.equal('');
	});

	it('should return empty string if strings only contain whitespace characters', function () {
		const before = '\r\n\t\f\v';
		const after = '';
		const html = diff(before, after);
		expect(html).to.equal('');
	});
});
