export default function model(Handler, request, actions) {
    return Handler.routes[0].handler.model(request, actions);
}