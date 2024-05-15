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
    if (strings[count + 1] === "<Text>") {
      do {
        text[iT] = strings[iT + count + 2];
        iT++;
      } while (
        count + iT < strings.length &&
        strings[count + iT + 2][0] !== "<"
      );
    } else {
      msg += " Нет секции <Text>.";
    }
    iT = iT ? iT + 1 : 0;
    // iT строк в секции <Text> + 1 строка с названием <Text>
    if (strings[count + iT + 1] === "<Vertexes>") {
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
    if (strings[count + 1 + iV + iT] === "<Edges>") {
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
    console.log(A, count);

    // в файле поступает матрица из строк, переделаем их в number
    function convertMatrixToStringInt(matrix) {
        // Преобразование каждого элемента строки в число
        return matrix.map(row => row.map(cell => parseInt(cell)));
    }
    A = convertMatrixToStringInt(A);
    console.log(A);

    function findArticulationPoints(matrix, N) {
        let visited = new Array(N).fill(false);
        let depth = new Array(N).fill(-1);
        let low = new Array(N).fill(-1);
        let time = 0;
        let articulationPoints = [];

        function DFS(v, parent) {
            visited[v] = true;
            depth[v] = low[v] = ++time;

            let children = 0;
            let isArticulation = false;

            for (let i = 0; i < N; i++) {
                if (matrix[v][i] === 1) {
                    if (!visited[i]) {
                        children++;
                        DFS(i, v);

                        low[v] = Math.min(low[v], low[i]);

                        if (parent!== -1 && low[i] >= depth[v]) {
                            isArticulation = true;
                        }
                    } else if (i!== parent) {
                        low[v] = Math.min(low[v], depth[i]);
                    }
                }
            }

            if ((children > 1) || (isArticulation)) {
                articulationPoints.push(v+1);
            }
        }

        for (let i = 0; i < N; i++) {
            if (!visited[i]) {
                DFS(i, -1);
            }
        }

        return articulationPoints;
    }

    console.log(typeof A[0][0])
    const articulationPoints = findArticulationPoints(A, count);
    console.log(articulationPoints);
    if (articulationPoints.length !== 0) {
        rez.innerHTML += "Шарниры графа: " + articulationPoints.join(', ');
        outputStr = "Шарниры графа: " + articulationPoints.join(', ');
    }
    else {
        rez.innerHTML += "Шарниры в графе отсуствуют!";
        outputStr = "Шарниры в графе отсуствуют!";
        rez.style.color = "red";
    }


    return outputStr;

  }