<template>
  <defaultPage :trace="traceMockData"/>
</template>


<script lang="ts" setup>
import defaultPage from './defaultPage'

const traceMockData = {
    "data": {
        "services": [
            {
                "name": "jaeger-all-in-one",
                "numberOfSpans": 1
            }
        ],
        "spans": [
            {
                "traceID": "d7f1cdb5d5f1137b65b8e5f5ad5ae58d",
                "spanID": "b4029d1b0a885027",
                "operationName": "/api/services",
                "references": [],
                "startTime": 1729510902627523,
                "duration": 596,
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
                        "value": 58
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
                        "value": 41160
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
        "traceID": "d7f1cdb5d5f1137b65b8e5f5ad5ae58d",
        "traceName": "jaeger-all-in-one: /api/services",
        "tracePageTitle": "/api/services (jaeger-all-in-one)",
        "traceEmoji": "🥖",
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
        "duration": 596,
        "startTime": 1729510902627523,
        "endTime": 1729510902628119
    },
    "id": "d7f1cdb5d5f1137b65b8e5f5ad5ae58d",
    "state": "FETCH_DONE"
}
</script>


<style lang="less" scoped></style>
