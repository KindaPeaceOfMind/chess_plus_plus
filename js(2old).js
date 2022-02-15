Initialization();
function Initialization()
{
	numb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C'];
	CreateTable();
	CreateFigs();
	CreateCellEvent();
	PaintInCells();
	color = true;//Чей ход

/*Создание всего*/
	
	//Создание таблицы
	function CreateTable()
	{
		let table = document.querySelector('#table');
	
		for (var i = 0; i < 13; i++)//Строка
		{
			let tr = document.createElement('tr');
			for (var j = 0; j < 13; j++)//Столбец
			{
				let td = document.createElement('td');
				tr.appendChild(td);
				td.id = numb[i] + "-" + numb[j]; //ID i-j
			}
			table.appendChild(tr);
		}
    }
	
	//Расстановка фигур ...чёрная фигура(6-11)
	function CreateFigs() {
		figs = [2,3,4,4,3,5,6,5,3,4,4,3,2];
		for (var j = 0; j < 13; j++) {
			GetCell(0, j).style.backgroundImage = "url(figs/" + figs[j] + ".png)"; //ID i-j
			GetCell(0, j).innerHTML = figs[j];
			GetCell(2, j).style.backgroundImage = "url(figs/1.png)"; //ID i-j
			GetCell(2, j).innerHTML = 1;
		}
		figs = [8, 9, 10, 10, 9, 11, 12, 11, 9, 10, 10, 9, 8];
		for (var j = 0; j < 13; j++) {
			GetCell(12, j).style.backgroundImage = "url(figs/" + figs[j] + ".png)"; //ID i-j
			GetCell(12, j).innerHTML = figs[j];
			GetCell(10, j).style.backgroundImage = "url(figs/7.png)"; //ID i-j
			GetCell(10, j).innerHTML = 7;
		}
	}

	//Добавление событий нажатий
	function CreateCellEvent() {
		for (var i = 0; i < 13; i++)//Строка
		{
			for (var j = 0; j < 13; j++)//Столбец
			{
				GetCell(i, j).onmousedown = Turn;
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


/*Главный ивент*/
	figbool = true;//белая фигура или чёрная
	exmove = false;
	
	///Нажатие на клетках
	function Turn()
	{
		//Дропает функцию если не того ход
		if (this.innerHTML != '') {
			if (this.innerHTML > 6) {
				figbool = false; //Если фигура чёрная - false
			} else {
				figbool = true; //Если белая - true
			}
			if (color != figbool)//Если фигура не подходит к цвету, то дропает
			{
				return;
			}
		}

		if (exmove && this.classList.contains('colored')) {
			//клетка переписывается на выбранную ранее фигуру
			this.innerHTML = GetCell(x, y).innerHTML;
			GetCell(x, y).innerHTML = '';//Фигура
			this.style.backgroundImage = GetCell(x, y).style.backgroundImage;
			GetCell(x, y).style.backgroundImage = '';//Картинка

			//Откраска
			Uncolor('colored');
			exmove = false;
			color = !color;
			return
		}

		//Если нажатие на закрашенную клетку

		//Перестановка-ход
		if (this.classList.contains('colored'))
		{
			//клетка переписывается на выбранную ранее фигуру
			this.innerHTML = GetCell(x, y).innerHTML;
			GetCell(x, y).innerHTML = '';//Фигура
			this.style.backgroundImage = GetCell(x, y).style.backgroundImage;
			GetCell(x, y).style.backgroundImage = '';//Картинка
			
			//Откраска
			Uncolor('colored');

			if (this.classList.contains('supply')) {
				//Вывод параметров клетки
				x = parseInt((this.id[0]), 16);
				y = parseInt((this.id[2]), 16);
				fig = this.innerHTML;
				console.log(x, y, fig);

				//Откраска прошлого нажатия
				Uncolor('colored');
				Uncolor('supply');

				//Новая закраска
				switch (fig) {
					case '1':
						WPawn(x, y);
						break
					case '2':
						WRook(x, y);
						break
					case '3':
						WKnight(x, y);
						break
					case '4':
						WBishop(x, y);
						break
					case '5':
						WQueen(x, y);
						break
					case '6':
						WKing(x, y);
						break
					case '7':
						BPawn(x, y);
						break
					case '8':
						BRook(x, y);
						break
					case '9':
						BKnight(x, y);
						break
					case '10':
						BBishop(x, y);
						break
					case '11':
						BQueen(x, y);
						break
					case '12':
						BKing(x, y);
						break
				}

				exmove = true;
			}
			else {
				color = !color; exmove = false;
			}
			
			Uncolor('supply');
		}
		//Закраска-ход
		else
		{
			
			//Вывод параметров клетки
			x = parseInt((this.id[0]), 16);
			y = parseInt((this.id[2]), 16);
			fig = this.innerHTML;
			console.log(x, y, fig);

			//Откраска прошлого нажатия
			Uncolor('colored');
			Uncolor('supply');

			//Новая закраска
			switch (fig){
				case '1':
					WPawn(x, y);
					break
				case '2':
					WRook(x, y);
					break
				case '3':
					WKnight(x, y);
					break
				case '4':
					WBishop(x, y);
					break
				case '5':
					WQueen(x, y);
					break
				case '6':
					WKing(x, y);
					break
				case '7':
					BPawn(x, y);
					break
				case '8':
					BRook(x, y);
					break
				case '9':
					BKnight(x, y);
					break
				case '10':
					BBishop(x, y);
					break
				case '11':
					BQueen(x, y);
					break
				case '12':
					BKing(x, y);
					break
			}

			//Линия снабжения пешек
			if (fig != '')
			{
				colored = document.getElementsByClassName('colored');
				//Для черных и белых
				switch (fig < 7) {
				case (true): //для белых
					for (i = 0; i < colored.length; i++)//для каждой закрашенной клетки
					{
						n = 1;
						while (GetCell(parseInt((colored[i].id[0]), 16) + n, parseInt((colored[i].id[2]), 16)).innerHTML != 1 &&
							parseInt((colored[i].id[0]), 16) + n < 12)
						{
							n++;
						}//Идёт вниз до другой фигуры
						//Проверяет пешка ли это
						if (GetCell(parseInt((colored[i].id[0]), 16) + n, parseInt((colored[i].id[2]), 16)).innerHTML == 1)
						{
							colored[i].classList.add('supply');//Закрашивает ту клетку,если снизу пешка
						}
						
					}
					break
				case (false): //для черных
					for (i = 0; i < colored.length; i++)//для каждой закрашенной клетки
					{
						n = 1;
						while (GetCell(parseInt((colored[i].id[0]), 16) - n, parseInt((colored[i].id[2]), 16)).innerHTML != 7 &&
							parseInt((colored[i].id[0]), 16) - n > 0) {
							n++;
						}//Идёт вниз до другой фигуры
						//Проверяет пешка ли это
						if (GetCell(parseInt((colored[i].id[0]), 16) - n, parseInt((colored[i].id[2]), 16)).innerHTML == 7)
						{
							colored[i].classList.add('supply');//Закрашивает ту клетку,если снизу пешка
						}
					}
				break
				}
			}

		}
	}


/*Вспомогательные функции*/

	//Откраска клеток
	function Uncolor(x) {

		classMassive = document.getElementsByClassName(x);

		for (i = 0; i < classMassive.length; i++)
		{
			classMassive[i].classList.remove(x);
			i--;
		}
	}

	//Получить клетку по ID="x-y"
	function GetCell(x, y) {
		return document.getElementById(numb[x] + "-" + numb[y]);
	}


/*Ходы фигур*/
	
	//Пэша бэлая
	function WPawn(x, y)
{
	if (GetCell(x + 1, y).innerHTML == ''){//первая клетка
		GetCell(x + 1, y).classList.add('colored');
		if (x == 2) {
			if (GetCell(x + 2, y).innerHTML == ''){//Первый ход вторая клетка
				GetCell(x + 2, y).classList.add('colored');

				if (GetCell(x + 3, y).innerHTML == ''){//Первый ход третья клетка
					GetCell(x + 3, y).classList.add('colored');
				}
			}
		}
	}
	//Диагонали
	if (y < 12) {
		if (GetCell(x + 1, y + 1).innerHTML > 6) {//Если чёрная фигура(7-12)
			GetCell(x + 1, y + 1).classList.add('colored');
		}
	}
	if (y > 0) {
		if (GetCell(x + 1, y - 1).innerHTML > 6) {//Если чёрная фигура(7-12)
			GetCell(x + 1, y - 1).classList.add('colored');
		}
	}
}

	//Слон белый
	function WBishop(x, y)
	{
		WDiagonal1(x, y);
		WDiagonal2(x, y);
		WDiagonal3(x, y);
		WDiagonal4(x, y);
	}

	//Конь белый
	function WKnight(x, y)
	{
		if (x < 12 && y < 11) {
			if (GetCell(x + 1, y + 2).innerHTML == '' || GetCell(x + 1, y + 2).innerHTML > 6) {
				GetCell(x + 1, y + 2).classList.add('colored');
			}
		}
		if (x < 11 && y < 12) {
			if (GetCell(x + 2, y + 1).innerHTML == '' || GetCell(x + 2, y + 1).innerHTML > 6) {
				GetCell(x + 2, y + 1).classList.add('colored');
			}
		}
		if (x < 11 && y > 0) {
			if (GetCell(x + 2, y - 1).innerHTML == '' || GetCell(x + 2, y - 1).innerHTML > 6) {
				GetCell(x + 2, y - 1).classList.add('colored');
			}
		}
		if (x < 12 && y > 1) {
			if (GetCell(x + 1, y - 2).innerHTML == '' || GetCell(x + 1, y - 2).innerHTML > 6) {
				GetCell(x + 1, y - 2).classList.add('colored');
			}
		}
		if (x > 0 && y > 1) {
			if (GetCell(x - 1, y - 2).innerHTML == '' || GetCell(x - 1, y - 2).innerHTML > 6) {
				GetCell(x - 1, y - 2).classList.add('colored');
			}
		}
		if (x > 1 && y > 0) {
			if (GetCell(x - 2, y - 1).innerHTML == '' || GetCell(x - 2, y - 1).innerHTML > 6) {
				GetCell(x - 2, y - 1).classList.add('colored');
			}
		}
		if (x > 1 && y < 12) {
			if (GetCell(x - 2, y + 1).innerHTML == '' || GetCell(x - 2, y + 1).innerHTML > 6) {
				GetCell(x - 2, y + 1).classList.add('colored');
			}
		}
		if (x > 0 && y < 11) {
			if (GetCell(x - 1, y + 2).innerHTML == '' || GetCell(x - 1, y + 2).innerHTML > 6) {
				GetCell(x - 1, y + 2).classList.add('colored');
			}
		}
	}

	//Ладья белая
	function WRook(x, y)
	{
		WLine1(x,y);
		WLine2(x,y);
		WLine3(x,y);
		WLine4(x,y);
	}

	//Королева белая
	function WQueen(x, y)
	{
		WDiagonal1(x, y);
		WDiagonal2(x, y);
		WDiagonal3(x, y);
		WDiagonal4(x, y);
		WLine1(x, y);
		WLine2(x, y);
		WLine3(x, y);
		WLine4(x, y);
	}

	//Король белых
	function WKing(x, y)
	{
		if (x < 12 && y < 12) {
			if (GetCell(x + 1, y + 1).innerHTML == '' || GetCell(x + 1, y + 1).innerHTML > 6) {
				GetCell(x + 1, y + 1).classList.add('colored');
			}
		}
		if (x < 12) {
			if (GetCell(x + 1, y).innerHTML == '' || GetCell(x + 1, y).innerHTML > 6) {
				GetCell(x + 1, y).classList.add('colored');
			}
		}
		if (x < 12 && y > 0) {
			if (GetCell(x + 1, y - 1).innerHTML == '' || GetCell(x + 1, y - 1).innerHTML > 6) {
				GetCell(x + 1, y - 1).classList.add('colored');
			}
		}
		if (y > 0) {
			if (GetCell(x, y - 1).innerHTML == '' || GetCell(x, y - 1).innerHTML > 6) {
				GetCell(x, y - 1).classList.add('colored');
			}
		}
		if (x > 0 && y > 0) {
			if (GetCell(x - 1, y - 1).innerHTML == '' || GetCell(x - 1, y - 1).innerHTML > 6) {
				GetCell(x - 1, y - 1).classList.add('colored');
			}
		}
		if (x > 0) {
			if (GetCell(x - 1, y).innerHTML == '' || GetCell(x - 1, y).innerHTML > 6) {
				GetCell(x - 1, y).classList.add('colored');
			}
		}
		if (x > 0 && y < 12) {
			if (GetCell(x - 1, y + 1).innerHTML == '' || GetCell(x - 1, y + 1).innerHTML > 6) {
				GetCell(x - 1, y + 1).classList.add('colored');
			}
		}
		if (y < 12) {
			if (GetCell(x, y + 1).innerHTML == '' || GetCell(x, y + 1).innerHTML > 6) {
				GetCell(x, y + 1).classList.add('colored');
			}
		}
	}

	//Прямые белых
	function WLine1(x, y)
	{
		if (x < 12)
		{
			if (GetCell(x + 1, y).innerHTML > 6) {
				GetCell(x + 1, y).classList.add('colored');
			}
			else {
				if (GetCell(x + 1, y).innerHTML == '') {
					GetCell(x + 1, y).classList.add('colored');
					WLine1(x + 1, y);
				}
			}
		}
	}
	function WLine2(x, y) {
		if (y > 0) {
			if (GetCell(x, y - 1).innerHTML > 6) {
				GetCell(x, y - 1).classList.add('colored');
			}
			else {
				if (GetCell(x, y - 1).innerHTML == '') {
					GetCell(x, y - 1).classList.add('colored');
					WLine2(x, y - 1);
				}
			}
		}
	}
	function WLine3(x, y) {
		if (x > 0) {
			if (GetCell(x - 1, y).innerHTML > 6) {
				GetCell(x - 1, y).classList.add('colored');
			}
			else {
				if (GetCell(x - 1, y).innerHTML == '') {
					GetCell(x - 1, y).classList.add('colored');
					WLine3(x - 1, y);
				}
			}
		}
	}
	function WLine4(x, y) {
		if (y < 12) {
			if (GetCell(x, y + 1).innerHTML > 6) {
				GetCell(x, y + 1).classList.add('colored');
			}
			else {
				if (GetCell(x, y + 1).innerHTML == '') {
					GetCell(x, y + 1).classList.add('colored');
					WLine4(x, y + 1);
				}
			}
		}
	}

	//Диагонали белых
	function WDiagonal1(x, y)
	{	
		if (x < 12 && y < 12)
		{
			if (GetCell(x + 1, y + 1).innerHTML > 6) {
				GetCell(x + 1, y + 1).classList.add('colored');
			}
			else
			{
				if (GetCell(x + 1, y + 1).innerHTML == '')
				{
					GetCell(x + 1, y + 1).classList.add('colored');
					WDiagonal1(x + 1, y + 1);
				}
			}
		}
	}
	function WDiagonal2(x, y)
	{
		if (x < 12 && y > 0) {
			if (GetCell(x + 1, y - 1).innerHTML > 6) {
				GetCell(x + 1, y - 1).classList.add('colored');
			}
			else {
				if (GetCell(x + 1, y - 1).innerHTML == '') {
					GetCell(x + 1, y - 1).classList.add('colored');
					WDiagonal2(x + 1, y - 1);
				}
			}
		}
	}
	function WDiagonal3(x, y)
	{
		if (x > 0 && y > 0) {
			if (GetCell(x - 1, y - 1).innerHTML > 6) {
				GetCell(x - 1, y - 1).classList.add('colored');
			}
			else {
				if (GetCell(x - 1, y - 1).innerHTML == '') {
					GetCell(x - 1, y - 1).classList.add('colored');
					WDiagonal3(x - 1, y - 1);
				}
			}
		}
	}
	function WDiagonal4(x, y) {
		if (x > 0 && y < 12) {
			if (GetCell(x - 1, y + 1).innerHTML > 6) {
				GetCell(x - 1, y + 1).classList.add('colored');
			}
			else {
				if (GetCell(x - 1, y + 1).innerHTML == '') {
					GetCell(x - 1, y + 1).classList.add('colored');
					WDiagonal4(x - 1, y + 1);
				}
			}
		}
	}



	//Пэша черный
	function BPawn(x, y) {
		if (GetCell(x - 1, y).innerHTML == '') {//первая клетка
			GetCell(x - 1, y).classList.add('colored');
			if (x == 10) {
				if (GetCell(x - 2, y).innerHTML == '') {//Первый ход вторая клетка
					GetCell(x - 2, y).classList.add('colored');

					if (GetCell(x - 3, y).innerHTML == '') {//Первый ход третья клетка
						GetCell(x - 3, y).classList.add('colored');
					}
				}
			}
		}
		//Диагонали
		if (y < 12) {
			if (GetCell(x - 1, y + 1).innerHTML < 7 && GetCell(x - 1, y + 1).innerHTML > 0) {//Если чёрная фигура(6-11)
				GetCell(x - 1, y + 1).classList.add('colored');
			}
		}
		if (y > 0) {
			if (GetCell(x - 1, y - 1).innerHTML < 7 && GetCell(x - 1, y - 1).innerHTML > 0) {//Если чёрная фигура(6-11)
				GetCell(x - 1, y - 1).classList.add('colored');
			}
		}
	}

	//Слон черный
	function BBishop(x, y) {
		BDiagonal1(x, y);
		BDiagonal2(x, y);
		BDiagonal3(x, y);
		BDiagonal4(x, y);
	}

	//Конь черный
	function BKnight(x, y) {
		if (x < 12 && y < 11) {
			if (GetCell(x + 1, y + 2).innerHTML == '' || GetCell(x + 1, y + 2).innerHTML < 7) {
				GetCell(x + 1, y + 2).classList.add('colored');
			}
		}
		if (x < 11 && y < 12) {
			if (GetCell(x + 2, y + 1).innerHTML == '' || GetCell(x + 2, y + 1).innerHTML < 7) {
				GetCell(x + 2, y + 1).classList.add('colored');
			}
		}
		if (x < 11 && y > 0) {
			if (GetCell(x + 2, y - 1).innerHTML == '' || GetCell(x + 2, y - 1).innerHTML < 7) {
				GetCell(x + 2, y - 1).classList.add('colored');
			}
		}
		if (x < 12 && y > 1) {
			if (GetCell(x + 1, y - 2).innerHTML == '' || GetCell(x + 1, y - 2).innerHTML < 7) {
				GetCell(x + 1, y - 2).classList.add('colored');
			}
		}
		if (x > 0 && y > 1) {
			if (GetCell(x - 1, y - 2).innerHTML == '' || GetCell(x - 1, y - 2).innerHTML < 7) {
				GetCell(x - 1, y - 2).classList.add('colored');
			}
		}
		if (x > 1 && y > 0) {
			if (GetCell(x - 2, y - 1).innerHTML == '' || GetCell(x - 2, y - 1).innerHTML < 7) {
				GetCell(x - 2, y - 1).classList.add('colored');
			}
		}
		if (x > 1 && y < 12) {
			if (GetCell(x - 2, y + 1).innerHTML == '' || GetCell(x - 2, y + 1).innerHTML < 7) {
				GetCell(x - 2, y + 1).classList.add('colored');
			}
		}
		if (x > 0 && y < 11) {
			if (GetCell(x - 1, y + 2).innerHTML == '' || GetCell(x - 1, y + 2).innerHTML < 7) {
				GetCell(x - 1, y + 2).classList.add('colored');
			}
		}
	}

	//Ладья черный
	function BRook(x, y) {
		BLine1(x, y);
		BLine2(x, y);
		BLine3(x, y);
		BLine4(x, y);
	}

	//Королева черный
	function BQueen(x, y) {
		BDiagonal1(x, y);
		BDiagonal2(x, y);
		BDiagonal3(x, y);
		BDiagonal4(x, y);
		BLine1(x, y);
		BLine2(x, y);
		BLine3(x, y);
		BLine4(x, y);
	}

	//Король черный
	function BKing(x, y) {
		if (x < 12 && y < 12) {
			if (GetCell(x + 1, y + 1).innerHTML == '' || GetCell(x + 1, y + 1).innerHTML < 7) {
				GetCell(x + 1, y + 1).classList.add('colored');
			}
		}
		if (x < 12) {
			if (GetCell(x + 1, y).innerHTML == '' || GetCell(x + 1, y).innerHTML < 7) {
				GetCell(x + 1, y).classList.add('colored');
			}
		}
		if (x < 12 && y > 0) {
			if (GetCell(x + 1, y - 1).innerHTML == '' || GetCell(x + 1, y - 1).innerHTML < 7) {
				GetCell(x + 1, y - 1).classList.add('colored');
			}
		}
		if (y > 0) {
			if (GetCell(x, y - 1).innerHTML == '' || GetCell(x, y - 1).innerHTML < 7) {
				GetCell(x, y - 1).classList.add('colored');
			}
		}
		if (x > 0 && y > 0) {
			if (GetCell(x - 1, y - 1).innerHTML == '' || GetCell(x - 1, y - 1).innerHTML < 7) {
				GetCell(x - 1, y - 1).classList.add('colored');
			}
		}
		if (x > 0) {
			if (GetCell(x - 1, y).innerHTML == '' || GetCell(x - 1, y).innerHTML < 7) {
				GetCell(x - 1, y).classList.add('colored');
			}
		}
		if (x > 0 && y < 12) {
			if (GetCell(x - 1, y + 1).innerHTML == '' || GetCell(x - 1, y + 1).innerHTML < 7) {
				GetCell(x - 1, y + 1).classList.add('colored');
			}
		}
		if (y < 12) {
			if (GetCell(x, y + 1).innerHTML == '' || GetCell(x, y + 1).innerHTML < 7) {
				GetCell(x, y + 1).classList.add('colored');
			}
		}
	}

	//Прямые черный
	function BLine1(x, y) {
		if (x < 12) {
			if (GetCell(x + 1, y).innerHTML < 7 && GetCell(x + 1, y).innerHTML > 0) {
				GetCell(x + 1, y).classList.add('colored');
			}
			else {
				if (GetCell(x + 1, y).innerHTML == '') {
					GetCell(x + 1, y).classList.add('colored');
					BLine1(x + 1, y);
				}
			}
		}
	}
	function BLine2(x, y) {
		if (y > 0) {
			if (GetCell(x, y - 1).innerHTML < 7 && GetCell(x, y - 1).innerHTML > 0) {
				GetCell(x, y - 1).classList.add('colored');
			}
			else {
				if (GetCell(x, y - 1).innerHTML == '') {
					GetCell(x, y - 1).classList.add('colored');
					BLine2(x, y - 1);
				}
			}
		}
	}
	function BLine3(x, y) {
		if (x > 0) {
			if (GetCell(x - 1, y).innerHTML < 7 && GetCell(x - 1, y).innerHTML > 0) {
				GetCell(x - 1, y).classList.add('colored');
			}
			else {
				if (GetCell(x - 1, y).innerHTML == '') {
					GetCell(x - 1, y).classList.add('colored');
					BLine3(x - 1, y);
				}
			}
		}
	}
	function BLine4(x, y) {
		if (y < 12) {
			if (GetCell(x, y + 1).innerHTML < 7 && GetCell(x, y + 1).innerHTML > 0) {
				GetCell(x, y + 1).classList.add('colored');
			}
			else {
				if (GetCell(x, y + 1).innerHTML == '') {
					GetCell(x, y + 1).classList.add('colored');
					BLine4(x, y + 1);
				}
			}
		}
	}

	//Диагонали черный
	function BDiagonal1(x, y) {
		if (x < 12 && y < 12) {
			if (GetCell(x + 1, y + 1).innerHTML < 7 && GetCell(x + 1, y + 1).innerHTML > 0) {
				GetCell(x + 1, y + 1).classList.add('colored');
			}
			else {
				if (GetCell(x + 1, y + 1).innerHTML == '') {
					GetCell(x + 1, y + 1).classList.add('colored');
					BDiagonal1(x + 1, y + 1);
				}
			}
		}
	}
	function BDiagonal2(x, y) {
		if (x < 12 && y > 0) {
			if (GetCell(x + 1, y - 1).innerHTML < 7 && GetCell(x + 1, y - 1).innerHTML > 0) {
				GetCell(x + 1, y - 1).classList.add('colored');
			}
			else {
				if (GetCell(x + 1, y - 1).innerHTML == '') {
					GetCell(x + 1, y - 1).classList.add('colored');
					BDiagonal2(x + 1, y - 1);
				}
			}
		}
	}
	function BDiagonal3(x, y) {
		if (x > 0 && y > 0) {
			if (GetCell(x - 1, y - 1).innerHTML < 7 && GetCell(x - 1, y - 1).innerHTML > 0) {
				GetCell(x - 1, y - 1).classList.add('colored');
			}
			else {
				if (GetCell(x - 1, y - 1).innerHTML == '') {
					GetCell(x - 1, y - 1).classList.add('colored');
					BDiagonal3(x - 1, y - 1);
				}
			}
		}
	}
	function BDiagonal4(x, y) {
		if (x > 0 && y < 12) {
			if (GetCell(x - 1, y + 1).innerHTML < 7 && GetCell(x - 1, y + 1).innerHTML > 0) {
				GetCell(x - 1, y + 1).classList.add('colored');
			}
			else {
				if (GetCell(x - 1, y + 1).innerHTML == '') {
					GetCell(x - 1, y + 1).classList.add('colored');
					BDiagonal4(x - 1, y + 1);
				}
			}
		}
	}
}