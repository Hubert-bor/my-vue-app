export default [
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "9bfe8376688e9116d9cbae28c0aa2db6",
        "spanID": "9b321d76f92134d2",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181197748657,
        "duration": 1503,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46826
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "9bfe8376688e9116d9cbae28c0aa2db6",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🥚",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 1503,
    "startTime": 1729181197748657,
    "endTime": 1729181197750160
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "7335606bdeabfe5ec3e6cc336428ea66",
        "spanID": "88836d07b92192bd",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181191705086,
        "duration": 1457,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46754
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "7335606bdeabfe5ec3e6cc336428ea66",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🐷",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 1457,
    "startTime": 1729181191705086,
    "endTime": 1729181191706543
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "69aaa850efd6a93c08a712d4a4e7b8c1",
        "spanID": "d41d4e4c558b79ca",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181191705115,
        "duration": 1433,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46762
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "69aaa850efd6a93c08a712d4a4e7b8c1",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "⛺️",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 1433,
    "startTime": 1729181191705115,
    "endTime": 1729181191706548
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "0961e4379a1e476c3a745750ae9b555d",
        "spanID": "3f3ce5d95d5f1ea4",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181153745541,
        "duration": 760,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 57638
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "0961e4379a1e476c3a745750ae9b555d",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "💎",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 760,
    "startTime": 1729181153745541,
    "endTime": 1729181153746301
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "acb5edf94189830442dd772143b97a73",
        "spanID": "d845a96f7abc3479",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181139757019,
        "duration": 675,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 45508
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "acb5edf94189830442dd772143b97a73",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "📘",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 675,
    "startTime": 1729181139757019,
    "endTime": 1729181139757694
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "adc991d3faee748297e4aa12efef0db6",
        "spanID": "6ec46cceaff24aa6",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181139757087,
        "duration": 607,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 45494
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "adc991d3faee748297e4aa12efef0db6",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🏴",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 607,
    "startTime": 1729181139757087,
    "endTime": 1729181139757694
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "f2267772066a65678558e329b5a96de9",
        "spanID": "9187033bd70f4a4f",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181197748488,
        "duration": 180,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46816
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "f2267772066a65678558e329b5a96de9",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🥦",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 180,
    "startTime": 1729181197748488,
    "endTime": 1729181197748668
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "8fe5ebb2c57d86855e66f86d5dddd8bd",
        "spanID": "80c8ab1eab911cd6",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181189702536,
        "duration": 160,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46744
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "8fe5ebb2c57d86855e66f86d5dddd8bd",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🍙",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 160,
    "startTime": 1729181189702536,
    "endTime": 1729181189702696
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "df4438184149a93da6d1caa0a76f8938",
        "spanID": "20e3d89f56994c2a",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181153746342,
        "duration": 131,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 57646
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "df4438184149a93da6d1caa0a76f8938",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🌸",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 131,
    "startTime": 1729181153746342,
    "endTime": 1729181153746473
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "24c77752e807d2523651a2332049336c",
        "spanID": "a8ca393ff1c2b0a8",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729179113672847,
        "duration": 126,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 49590
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "24c77752e807d2523651a2332049336c",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "💧",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 126,
    "startTime": 1729179113672847,
    "endTime": 1729179113672973
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "46f4023030cbfdf1f418175dee7a3b53",
        "spanID": "c6b0f86b5c2ac012",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729179113672847,
        "duration": 122,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 49604
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "46f4023030cbfdf1f418175dee7a3b53",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🌪️",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 122,
    "startTime": 1729179113672847,
    "endTime": 1729179113672969
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "181d47f91012077cf7cded3909751c2e",
        "spanID": "822c34720c80a7ea",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181189702563,
        "duration": 115,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46750
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "181d47f91012077cf7cded3909751c2e",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🪚",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 115,
    "startTime": 1729181189702563,
    "endTime": 1729181189702678
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "18855d3e24ad0abb3a81e00b0e8bc93e",
        "spanID": "8e58a186132b6ca1",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181195743113,
        "duration": 115,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46796
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "18855d3e24ad0abb3a81e00b0e8bc93e",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🪚",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 115,
    "startTime": 1729181195743113,
    "endTime": 1729181195743228
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "1584b72a00f3ac774601a240d0074049",
        "spanID": "0984cb5d376d4d62",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181166732851,
        "duration": 111,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46326
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "1584b72a00f3ac774601a240d0074049",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🥎",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 111,
    "startTime": 1729181166732851,
    "endTime": 1729181166732962
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "77f7c1887c884291d26dc97d091406ce",
        "spanID": "d5c92abfda44db88",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181193740254,
        "duration": 103,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46786
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "77f7c1887c884291d26dc97d091406ce",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🐷",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 103,
    "startTime": 1729181193740254,
    "endTime": 1729181193740357
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "02abac85ea4ab1fab02f55840ded4917",
        "spanID": "a97af8b49d5619ee",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181200736563,
        "duration": 93,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 55900
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "02abac85ea4ab1fab02f55840ded4917",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🍉",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 93,
    "startTime": 1729181200736563,
    "endTime": 1729181200736656
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "86adbd644b162883b33c187f991c17d9",
        "spanID": "737e5236d231b7cd",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181200736673,
        "duration": 93,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 55906
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "86adbd644b162883b33c187f991c17d9",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🥎",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 93,
    "startTime": 1729181200736673,
    "endTime": 1729181200736766
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "f8683616757381cad4f03b2316a64b34",
        "spanID": "f7ae62923d16b0c1",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181195743152,
        "duration": 86,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46810
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "f8683616757381cad4f03b2316a64b34",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🐨",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 86,
    "startTime": 1729181195743152,
    "endTime": 1729181195743238
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "d0aa3b3d427cf7129fe3cdb36a0729a3",
        "spanID": "dfa574e7402ca43a",
        "operationName": "/api/services/{service}/operations",
        "references": [],
        "startTime": 1729181166732938,
        "duration": 81,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 146
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services/{service}/operations"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services/jaeger-all-in-one/operations"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46328
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "d0aa3b3d427cf7129fe3cdb36a0729a3",
    "traceName": "jaeger-all-in-one: /api/services/{service}/operations",
    "tracePageTitle": "/api/services/{service}/operations (jaeger-all-in-one)",
    "traceEmoji": "🎲",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 81,
    "startTime": 1729181166732938,
    "endTime": 1729181166733019
  },
  {
    "services": [
      {
        "name": "jaeger-all-in-one",
        "numberOfSpans": 1
      }
    ],
    "spans": [
      {
        "traceID": "fde7f1148a96ec81abf4f1143f6f05a9",
        "spanID": "f2d5350bc5f06e2e",
        "operationName": "/api/services",
        "references": [],
        "startTime": 1729181193740319,
        "duration": 81,
        "tags": [
          {
            "key": "http.client_ip",
            "type": "string",
            "value": "::1"
          },
          {
            "key": "http.method",
            "type": "string",
            "value": "GET"
          },
          {
            "key": "http.response_content_length",
            "type": "int64",
            "value": 75
          },
          {
            "key": "http.route",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "http.scheme",
            "type": "string",
            "value": "http"
          },
          {
            "key": "http.status_code",
            "type": "int64",
            "value": 200
          },
          {
            "key": "http.target",
            "type": "string",
            "value": "/api/services"
          },
          {
            "key": "internal.span.format",
            "type": "string",
            "value": "otlp"
          },
          {
            "key": "net.host.name",
            "type": "string",
            "value": "localhost"
          },
          {
            "key": "net.host.port",
            "type": "int64",
            "value": 16686
          },
          {
            "key": "net.protocol.version",
            "type": "string",
            "value": "1.1"
          },
          {
            "key": "net.sock.peer.addr",
            "type": "string",
            "value": "172.17.0.1"
          },
          {
            "key": "net.sock.peer.port",
            "type": "int64",
            "value": 46772
          },
          {
            "key": "otel.scope.name",
            "type": "string",
            "value": "go.opentelemetry.io/contrib/instrumentation/net/http/otelhttp"
          },
          {
            "key": "otel.scope.version",
            "type": "string",
            "value": "0.55.0"
          },
          {
            "key": "span.kind",
            "type": "string",
            "value": "server"
          },
          {
            "key": "user_agent.original",
            "type": "string",
            "value": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
          }
        ],
        "logs": [],
        "processID": "p1",
        "warnings": [],
        "process": {
          "serviceName": "jaeger-all-in-one",
          "tags": [
            {
              "key": "host.name",
              "type": "string",
              "value": "336dc4651499"
            },
            {
              "key": "os.type",
              "type": "string",
              "value": "linux"
            },
            {
              "key": "telemetry.sdk.language",
              "type": "string",
              "value": "go"
            },
            {
              "key": "telemetry.sdk.name",
              "type": "string",
              "value": "opentelemetry"
            },
            {
              "key": "telemetry.sdk.version",
              "type": "string",
              "value": "1.30.0"
            }
          ]
        },
        "relativeStartTime": 0,
        "depth": 0,
        "hasChildren": false,
        "childSpanIds": []
      }
    ],
    "traceID": "fde7f1148a96ec81abf4f1143f6f05a9",
    "traceName": "jaeger-all-in-one: /api/services",
    "tracePageTitle": "/api/services (jaeger-all-in-one)",
    "traceEmoji": "🥎",
    "processes": {
      "p1": {
        "serviceName": "jaeger-all-in-one",
        "tags": [
          {
            "key": "host.name",
            "type": "string",
            "value": "336dc4651499"
          },
          {
            "key": "os.type",
            "type": "string",
            "value": "linux"
          },
          {
            "key": "telemetry.sdk.language",
            "type": "string",
            "value": "go"
          },
          {
            "key": "telemetry.sdk.name",
            "type": "string",
            "value": "opentelemetry"
          },
          {
            "key": "telemetry.sdk.version",
            "type": "string",
            "value": "1.30.0"
          }
        ]
      }
    },
    "duration": 81,
    "startTime": 1729181193740319,
    "endTime": 1729181193740400
  }
]
