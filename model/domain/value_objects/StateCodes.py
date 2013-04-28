class StateCodes:
    @staticmethod
    def parse(value):
        i = int(value)
        if i > 3:
            raise Exception("Unknown value")
        return i

    Ok = 0
    OkButErrorInCounter = 1
    Timeout = 2
    ParityCheckError = 3