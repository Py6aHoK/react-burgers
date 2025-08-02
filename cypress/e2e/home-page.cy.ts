const testIngredient: string = 'Флюоресцентная булка R2-D3';
const testDetails: string = 'Детали ингредиента';
const testProfile: string = 'Личный кабинет';
const testConstructor: string = '#burgerConstructor';

describe('Сервис доступен', function () {
	before(function () {
		cy.visit('/');
	});

	it('Проверка открытия страницы конструктора', function () {
		cy.contains('Соберите бургер');
	});

	it('Проверка авторизации', function () {
		cy.contains(testProfile).click();
		cy.get('.input').as('login-form');
		cy.get('@login-form').find('[class^=text]').first().as('email-input');
		cy.get('@login-form').find('[class^=input__icon]').first().click();
		cy.get('@email-input').type('yolo@mail.ru');
		cy.get('@login-form')
			.find('[class^=text]')
			.last()
			.as('password-input')
			.type('12345');
		cy.contains('Войти').click();
	});

	it(
		'Проверка открытие модального окна с описанием ингредиента, ' +
			'отображения данных о нем и закрытия при нажатии на кнопку закрытия',
		function () {
			cy.contains(testIngredient).click();
			cy.contains(testDetails).should('be.visible');
			cy.contains(testIngredient).should('be.visible');
			cy.get('#modalCloseButton').click();
		}
	);

	it(
		'Проверка открытие модального окна с описанием ингредиента, ' +
			'отображения данных о нем и закрытия при нажатии на подложку',
		function () {
			cy.contains(testIngredient).click();
			cy.contains(testDetails).should('be.visible');
			cy.contains(testIngredient).should('be.visible');
			cy.get('#modalOverlay').click(-20, -20, { force: true });
		}
	);

	it(
		'Проверка перетаскивания ингредиента в конструктор и ' +
			'открытия модалки после оформления заказа',
		function () {
			cy.contains(testIngredient).trigger('dragstart');
			cy.get(testConstructor).trigger('drop');
			cy.get(testConstructor).contains(testIngredient);
			cy.contains('Биокотлета из марсианской Магнолии').trigger('dragstart');
			cy.get(testConstructor).trigger('drop');
			cy.get(testConstructor).contains('Биокотлета из марсианской Магнолии');
			cy.contains('Кристаллы марсианских альфа-сахаридов').trigger('dragstart');
			cy.get(testConstructor).trigger('drop');
			cy.get(testConstructor).contains('Кристаллы марсианских альфа-сахаридов');
			cy.contains('Соус Spicy-X').trigger('dragstart');
			cy.get(testConstructor).trigger('drop');
			cy.get(testConstructor).contains('Соус Spicy-X');
			cy.contains('Оформить заказ').click();
			cy.wait(20000);
			cy.contains('Ваш заказ начали готовить').should('exist');
			cy.get('#modalCloseButton').click();
		}
	);

	it('Проверка разавторизации', function () {
		cy.contains(testProfile).click();
		cy.contains('Выход').click();
		cy.contains('Конструктор').click();
	});
});
