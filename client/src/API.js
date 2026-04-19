const API_URL = '/api';
const request = async (url, options) => {
    // Вытаскиваем наш флаг, чтобы он не улетел в чистый fetch
    const { skip_redirect, ...fetch_options } = options;

    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
        },
        ...fetch_options, // Сюда пойдут только method, body и т.д.
        credentials: 'include', // Обязательно для работы с куками (httpOnly)
    });

    // Заглушка для ответов без контента
    if (res.status === 204) return {};

    const data = await res.json();

    if (!res.ok) {
        const is_auth_error = res.status === 401 || res.status === 404;

        // Если это ошибка авторизации и МЫ НЕ ПРОСИЛИ её игнорировать (нет флага)
        if (is_auth_error && !skip_redirect) {
            const text = res.status === 401 ? 'Сессия завершена, авторизуйтесь снова.' : 'Пользователь не найден или аккаунт удален';

            sessionStorage.setItem('auth_error', text);
            window.location.replace('/auth');
            return;
        }

        // Если флаг skip_redirect есть, просто пробрасываем ошибку в catch
        throw new Error(data.message || 'Ошибка сервера');
    }

    return data;
};

export const API = {
    // Проверка авторизации (с флагом пропуска редиректа)
    check_auth: () => {
        return request(`${API_URL}/words/me`, {
            method: 'GET',
            skip_redirect: true,
        });
    },
};
