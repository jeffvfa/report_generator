'use sctrict';
import retrieveCategoryFromFile from '../../src/object_transformers/retrieve_category_from_file';

describe('=> Retrive Category From file Suite', () => {
    it('-> import should be defined', () => {
        expect(retrieveCategoryFromFile).toBeDefined();
    });

    it('-> Category should be TEST (js case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.spec.js';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('TEST');
    });

    it('-> Category should be TEST (ts case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.spec.ts';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('TEST');
    });

    it('-> Category should be TEST (generic case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFileTest.extension';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('TEST');
    });

    it('-> Category should be JAVA', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.java';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('JAVA');
    });

    it('-> Category should be JAVASCRIPT (js case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.js';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('JAVASCRIPT');
    });

    it('-> Category should be JAVASCRIPT (ts case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.ts';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('JAVASCRIPT');
    });

    it('-> Category should be KEY_VALUE (json case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.json';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('KEY_VALUE');
    });

    it('-> Category should be KEY_VALUE (xml case)', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.xml';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('KEY_VALUE');
    });

    it('-> Category should be CSS', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.css';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('CSS');
    });

    it('-> Category should be HTML', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.html';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('HTML');
    });

    it('-> Category should be SCALA', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFile.scala';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('SCALA');
    });

    it('-> Category should be OUTRO', () => {
        // Setup
        const fileName = '/mockRootDirectory/mockSubDirectory/mockFileWithoutExtension';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe('OUTRO');
    });

    it('-> Category should be undefined', () => {
        // Setup
        const fileName = '';
        // Action
        const result = retrieveCategoryFromFile(fileName);
        // Verify
        expect(result).toBe(undefined);
    });
});
