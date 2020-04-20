interface IGitLogOutput {
    commit: string;
    directory: string;
    author: string;
    date: string;
    message: string;
    files: string[];
}

type TFileComplexity = 'BAIXA' | 'MEDIA' | 'ALTA';
type TFileCategory = 'TEST' | 'JAVA' | 'JAVASCRIPT' | 'KEY_VALUE' | 'CSS' | 'HTML' | 'SCALA' | 'OUTRO';
type TDiffType = 'M' | 'A';

type TTxtArrayCell = {
    description: string;
    fileList: { [key in TFileComplexity]?: string[] };
};
type TTxtStructure = {
    [key: string]: TTxtArrayCell;
}
type TWorksheetComplexityCell = {
    description: string;
    USTBB_A: number;
    USTBB_M: number;
};
type TWorksheetCell = {
    A: string;
    M: string;
    TASK_NUMBER_A: string;
    TASK_NUMBER_M: string;
    BAIXA: TWorksheetComplexityCell;
    MEDIA: TWorksheetComplexityCell;
    ALTA: TWorksheetComplexityCell;
};
type TWorksheetAttributes = {
    [key in TFileCategory]?: TWorksheetCell;
};
type TWorksheetHeader =
    'index'
    | 'Tarefa'
    | 'Disciplina'
    | 'Atividade'
    | 'Descricao/Artefato'
    | 'Plataforma'
    | 'Complexidade'
    | 'Componente/Item'
    | 'Unidade de medida'
    | 'Descricao da complexidade'
    | 'Qtd'
    | 'Nome do Artefato/Objeto'
    | 'USTIBB'
    | 'USTIBB Total';
type TWorksheetRow = {
    [key in TWorksheetHeader]: any;
};

type TComplexityCalculator = {
    [key in TFileCategory]?: (arg0: string) => TFileComplexity;
}

type TFileProperties = {
    diffType: TDiffType;
    filePath: string;
    category: TFileCategory;
    complexity: TFileComplexity;
    rootDirectory: string;
};
type TTaskProperties = {
    [key: string]: TFileProperties[];
};
