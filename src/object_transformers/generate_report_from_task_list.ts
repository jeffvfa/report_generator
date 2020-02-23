'use strict';

import fs from "fs";
import * as buffer from "buffer";
import ExcelJS, {Alignment, Border, Column, Fill, Workbook, Worksheet} from "exceljs";

const setDefaultConfigForWorkBookAndGetSheet = (workbook: Workbook): Worksheet => {
    workbook.creator = 'report_generator';
    workbook.lastModifiedBy = 'report_generator';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();
    workbook.views = [
        {
            x: 0, y: 0, width: 10000, height: 20000,
            firstSheet: 0, activeTab: 1, visibility: 'visible'
        }
    ];
    let sheet = workbook.addWorksheet('Planilha OF/Orcamento ', {
        pageSetup: {paperSize: 9, orientation: 'landscape'}
    });
    const keysToExtract: TWorksheetHeader[] = [
        'index',
        'Tarefa',
        'Disciplina',
        'Atividade',
        'Descrição/Artefato',
        'Complexidade',
        'Componente/Item',
        'Unidade de medida',
        'Descrição da complexidade',
        'Qtd',
        'Nome do Artefato/Objeto',
        'USTIBB',
        'Unitário',
        'USTIBB Total'];

    sheet.columns = keysToExtract.map(headTitle => {
        return {
            header: headTitle,
            key: headTitle,
            width: 31
        };
    });
    return sheet;
};

const setDefaultStyleForWorkSheet = (sheet: Worksheet): void => {
    const defaultAlignment: Partial<Alignment> = {vertical: 'middle', horizontal: 'center'};
    const defaultBlueCell: Fill = {type: 'pattern', pattern: 'solid', fgColor: {argb: '205696'}};
    const columnsWithBlueCells = ['index', 'Tarefa'];
    const defaultBorder: Partial<Border> = {color: {argb: '000000'}, style: 'thin'};
    sheet.eachRow({includeEmpty: true}, (row, rowNumber) => {

        row.eachCell((cell, colNumber) => {
            if (rowNumber === 1) {
                cell.font = {size: 15, color: {argb: 'FFFFFF'}};
                cell.fill = defaultBlueCell;
            } else if (columnsWithBlueCells.includes(sheet.getColumn(colNumber).key!)) {
                cell.font = {size: 13, color: {argb: 'FFFFFF'}};
                cell.fill = defaultBlueCell;
            }
            cell.border = {bottom: defaultBorder, top: defaultBorder, left: defaultBorder, right: defaultBorder};
            cell.alignment = defaultAlignment;
        });

    })
};

const generate_report = (calculatedTaskList?: TTaskProperties) => {
    let workbook: Workbook = new ExcelJS.Workbook();
    let sheet = setDefaultConfigForWorkBookAndGetSheet(workbook);
    sheet.addRow({index: 1, Tarefa: "Tarefa1", Atividade: "Plataforma distribuida"} as TWorksheetRow);
    setDefaultStyleForWorkSheet(sheet);
    workbook.xlsx.writeBuffer().then((buffer) => {
        fs.writeFile('output/saida3.xlsx', buffer, err => console.log(err));
    });
};

export default generate_report;