let errorCodes = new Map()
errorCodes.set("internalError", "Неизвестная ошибка на сервере")
errorCodes.set("wrongRequestParameters", "Неверные параметры запроса")
errorCodes.set("wrongHolidaysStartAndEnd", "Неверные даты начала и конца каникул")
errorCodes.set("groupAlreadyExists", "Группа уже существует")
errorCodes.set("addHolidaysBefore", "Прежде чем добавлять группу, добавьте каникулы")
errorCodes.set("incorrectPhoneFormat", "Неверный формат телефона")

export function getMessage(code) {
    return errorCodes.get(code)
}