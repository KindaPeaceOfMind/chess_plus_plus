Tetris();
function Tetris()
{
	Init();
	/*Создание всего*/
    function Init()
	{
		CreateTable();//Создание таблицы

		CreateFigs();//Создание фигур

		CreateCellEvent();//Добавление событий нажатий

		PaintInCells();//Покраска доски в клеточку

		//Создание таблицы
		function CreateTable() {
			let table = document.querySelector('#table');

			for (var i = 0; i < 13; i++)//Строка
			{
				let tr = document.createElement('tr');
				for (var j = 0; j < 13; j++)//Столбец
				{
					let td = document.createElement('td');
					tr.appendChild(td);
					td.id = i + "-" + j; //ID i-j
				}
				table.appendChild(tr);
			}
		}
		//Создание фигур - графики
		function CreateFigs()
		{
			figs = [2,3,4,4,3,5,6,5,3,4,4,3,2]
			for (var i = 0; i < 13; i++)
			{
				let fig = document.createElement('div');
				
				fig.id = 'figN' + (i+1);			//figN(id) - уникальное ID для каждой фигуры
				fig.classList.add('fig' + figs[i]);	//fig(class) - уникальный класс для каждого типа
				fig.classList.add('figs');			//figs - общий класс
				fig.innerHTML = i;
				document.getElementById('table').prepend(fig);
			}
		}
		//Добавление событий нажатий
		function CreateCellEvent() {
			for (var i = 0; i < 13; i++)//Строка
			{
				for (var j = 0; j < 13; j++)//Столбец
				{
					GetCell(i, j).onmousedown = Event();
				}
			}
		}
		//Покраска доски в клеточку
		function PaintInCells()
		{
			for (i = 0; i <= 12; i++) {
				for (j = 0; j <= 12; j++) {
					if ((i + j) % 2 == 0) {
						GetCell(i, j).classList.add('OddCell');
					}
				}
			}
		}
	}

	/*Получить клетку по ID="x-y"*/
	function GetCell(x, y) {
		return document.getElementById(x + "-" + y);
	}

	/*Любое нажатие на клетку*/
	function Event()
	{
		//this //атрибуты нажатой клетки(добавляется)
		
		var x = 0;

		//Turn(x1,y1,x2,y2,fig,fig2);
		function Turn(x1, y1, x2, y2, fig, fig2) {
			x += 1;
			turns = turns.add(x1, y1, x2, y2, fig, fig2);
        }
		
		
	}
}