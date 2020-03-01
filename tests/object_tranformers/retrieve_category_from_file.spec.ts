'use sctrict';
import retrieveCategoryFromFile from '../../src/object_transformers/retrieve_category_from_file';

describe('=> Retrive Category From file Suite', () => {
    it('-> import should be defined', () => {
        expect(retrieveCategoryFromFile).toBeDefined();
    });
});
