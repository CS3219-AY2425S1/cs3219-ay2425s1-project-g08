import requests
import threading

HOSTNAME = "http://34.87.19.0:3000"
URL_TO_TEST = f"{HOSTNAME}/match/findMatch"
data = {
    "name": "temp",
    "category": "ALGORITHMS",
    "difficulty": "EASY"
}
THREADS_TO_SPAWN = 20
WORK_PER_THREAD = 100

def sendRequest():
  for i in range(WORK_PER_THREAD):
    r = requests.post(url=URL_TO_TEST, json=data)

if __name__ == "__main__":
  thread_list = []
  for i in range(THREADS_TO_SPAWN):
    thread = threading.Thread(target=sendRequest)
    thread_list.append(thread)

  for thread in thread_list:
    thread.start()
  
  for thread in thread_list:
    thread.join()