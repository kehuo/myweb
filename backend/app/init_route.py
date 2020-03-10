# @File: init_route
# @Author: Kevin Huo
# @LastUpdate: 3/9/2020 7:29 PM


from app.init_global import global_var
from model_route_config import init_route_func_map


models = global_var['models']
model_func_map = []


def init_route_func(api, api_version):
    """
    model = "ml", 写在service.conf中
    route_init_func = {"ml": ml_route_func}
    func = ["ml", ml_route]

    运行的时候: ml_route(api, api_version="v1", func[0]="ml")
    """

    for model in models:
        func = init_route_func_map.get(model, None)
        if func is None:
            print('Failed to get model function')
            continue
        model_func_map.append([model, func])
    # init model route
    for func in model_func_map:
        func[1](api, api_version, func[0])
    return
