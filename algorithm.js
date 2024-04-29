function myAlgoritm(inputStr) {
    // извлекаем информацию в массивы
    let strings = inputStr.split("\n");
    let vertexes = [],
      edges = [],
      A = []; // вершины, дуги, матрица смежности (длин дуг)
    let text = [];
    let iT = 0;
    let iV = 0;
    let msg = "";
    if (!strings.length) return;
    var count = Number(strings[0]);
    for (let i = 1; i < count + 1; i++) {
      A[i - 1] = strings[i].split(/\s+/);
    }
    // 1 строка с числом cjunt+ count строк в матрице смежности
    if (strings[count + 1] == "<Text>") {
      do {
        text[iT] = strings[iT + count + 2];
        iT++;
      } while (
        count + iT < strings.length &&
        strings[count + iT + 2][0] != "<"
      );
    } else {
      msg += " Нет секции <Text>.";
    }
    iT = iT ? iT + 1 : 0;
    // iT строк в секции <Text> + 1 строка с названием <Text>
    if (strings[count + iT + 1] == "<Vertexes>") {
      for (let i = 1; i < count + 1; i++) {
        vertexes[i - 1] = strings[i + count + 1 + iT].split(/\s+/);
      }
      iV = count + 1;
    } else {
      iV = 0;
      msg += " Нет секции <Vertexes>.";
    }
    //считаем, что если секция<Vertexes> есть, то в ней count строк
    //debugger;
    if (strings[count + 1 + iV + iT] == "<Edges>") {
      let m = strings.length - count - 2 - iV - iT;
      for (let i = 1; i < m; i++) {
        edges[i - 1] = strings[i + count + iV + iT + 1].split(/\s+/);
      }
    } else {
      msg += " Нет секции <Edges>.";
    }
    console.log(msg);
    let rez = document.getElementById("rezAlgo");
    rez.innerHTML += " Готово. <hr>";
    // обрабатываем
       /* МОЙ КОД */

    // массив посещенных вершнин; изначально никто не посещен
    let visited = new Array(count).fill(false);
    // глубина; изначально глубина всех точек = 0
    let depth = new Array(count).fill(0);
    // массив с родительскими вершинами для каждой вершинки; при отсутствии == -1; 
    let parent = new Array(count).fill(-1);
    // шаг алгоритма; мы еще никуда не шли, так что шаг = 0
    let time = 0;

    /**
     * @brief поиск в глубину
     **/
    function dfs(v) {
      visited[v] = true;
      time++;
      depth[v] = time;
      for (let i = 0; i < count; i++) {
        if (A[v][i] !== "0" && !visited[i]) {
          parent[i] = v;
          dfs(i);
        }
      }
    }

    // Начало обхода с вершины 0
    dfs(0);

    // массив шарниров
    let articulationPoints = [];
    for (let v = 0; v < count; v++) {
      let children = 0;
      let descendants = 0;
      for (let i = 0; i < count; i++) {
        if (A[v][i] !== "0" && parent[v] !== i) {
          children++;
          if (depth[i] > depth[v]) {
            descendants++;
          }
        }
      }
      if (children > 1 || (children === 1 && descendants > 0)) {
        articulationPoints.push(v);
      }
    }

    // Вывод результатов
    rez.innerHTML += "<br>";
    rez.innerHTML += articulationPoints;
    console.log("Шарниры графа:", articulationPoints);
    return outputStr;
  }