export default (context, inject) => {
  inject('config', context.env.config)
}
