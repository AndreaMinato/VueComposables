import {
    parse,
    unparse,
    type UnparseConfig,
    type ParseConfig,
  } from "papaparse";

  import { unref } from "vue";

  import type { MaybeRef } from "@vueuse/shared";

  export function useCsv<T>(options?: MaybeRef<UnparseConfig>) {
    function exportToFile(fileName: string, array: MaybeRef<Array<T>>) {
      const csv = unparse(unref(array), unref(options));
      const element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
      );
      element.setAttribute("download", `${fileName}.csv`);
      element.style.display = "none";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    function importFromFile(
      file: File,
      options: ParseConfig = { dynamicTyping: true }
    ): Promise<Array<T>> {
      return new Promise((resolve, reject) => {
        parse<T, File>(file, {
          ...options,
          complete: (result) => {
            console.log(result.data);
            resolve(result.data);
          },
          error: reject,
          header: true,
        });
      });
    }

    return { exportToFile, importFromFile };
  }
