import ExcelJS from "exceljs";

export default async function readExcel(path: string) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(path);

  const result: Record<string, any[]> = {};

  workbook.eachSheet((sheet) => {
    const rows: any[] = [];

    sheet.eachRow({ includeEmpty: true }, (row: any) => {
      const rawValues = Array.isArray(row.values)
        ? row.values
        : Object.values(row.values || {});

      const rowValues = rawValues
        .slice(1) 
        .map((cell: any) => {
          if (cell && typeof cell === "object" && "result" in cell) {
            return cell.result ?? "";
          }
          if (cell === undefined || cell === null) {
            return "";
          }

          return cell;
        });

      rows.push(rowValues);
    });

    result[sheet.name] = rows;
  });

  return result;
}

// (async () => {
//   const data = await readExcel("test.xlsx");
//   console.log(data);
// })();
