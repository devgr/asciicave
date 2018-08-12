"""
A rediculously simple dependency injection solution.
"""

container = {}


class InjectorError(Exception):
    pass


class TransientDep:
    def __init__(self, cls, arg_list, kwarg_dict):
        self.cls = cls
        self.arg_list = arg_list
        self.kwarg_dict = kwarg_dict

    def provide(self):
        return self.cls(*self.arg_list, **self.kwarg_dict)


class SingletonDep:
    def __init__(self, cls, arg_list, kwarg_dict):
        self.cls = cls
        self.arg_list = arg_list
        self.kwarg_dict = kwarg_dict
        self.value = None

    def provide(self):
        if self.value is None:
            self.value = self.cls(*self.arg_list, **self.kwarg_dict)
        return self.value


class ValueDep:
    def __init__(self, value):
        self.value = value

    def provide(self):
        return self.value


def register_transient(name, cls, *args, **kwargs):
    """
    Register a dependency
    :name: String name that will be used by code that requires the dependency.
    :cls: The depenency itself. Will be instantiated each time it is needed.
    :*args: Optional arguments that will be used when instantiating the obj.
    :*kwargs: Optional keyword arguments that will be used when instantiating the obj.
    """
    container[name] = TransientDep(cls, args, kwargs)

def register_singleton(name, cls, *args, **kwargs):
    """
    Register a dependency
    :name: String name that will be used by code that requires the dependency.
    :cls: The depenency itself. Will be instantiated only once.
    :*args: Optional arguments that will be used when instantiating the obj.
    :*kwargs: Optional keyword arguments that will be used when instantiating the obj.
    """
    container[name] = SingletonDep(cls, args, kwargs)

def register_value(name, value):
    """
    Register a dependency
    :name: String name that will be used by code that requires the dependency.
    :value: The depenency itself. Can be any type.
    """
    container[name] = ValueDep(value)

def provide(name):
    """
    Get a dependency
    :name: String name that the dependency was registered with.
    :return: The dependency, either as a new instance, singleton instance, or value.
    """
    try:
        dep = container[name]
    except KeyError as e:
        raise InjectorError(e)

    return dep.provide()
